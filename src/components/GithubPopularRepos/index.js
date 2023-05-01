import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

/* <ul>
  <RepositoryItem languageId={isActiveTabId} />
</ul> */

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]
const onRenderDisplay = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
// Write your code here
class GithubPopularRepos extends Component {
  state = {
    isActiveTabId: languageFiltersData[0].id,
    isStatus: '',
    filteredRepoData: [],
  }

  componentDidMount() {
    this.getRepositoryData()
  }

  getRepositoryData = async () => {
    const {isActiveTabId} = this.state
    this.setState({isStatus: onRenderDisplay.inProgress})
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${isActiveTabId}`
    const response = await fetch(apiUrl)
    console.log(response)
    if (response.ok) {
      const data = await response.json()

      const updatedFetchData = data.popular_repos.map(eachRepo => ({
        id: eachRepo.id,
        avatarUrl: eachRepo.avatar_url,
        forksCount: eachRepo.forks_count,
        issuesCount: eachRepo.issues_count,
        name: eachRepo.name,
        starsCount: eachRepo.stars_count,
      }))
      this.setState({
        filteredRepoData: updatedFetchData,
        isStatus: onRenderDisplay.success,
      })
    } else {
      this.setState({isStatus: onRenderDisplay.failure})
    }
  }

  isActiveTab = id => {
    this.setState({isActiveTabId: id}, this.getRepositoryData)
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  renderOnSuccessView = () => {
    const {filteredRepoData} = this.state
    return (
      <ul className="repo-file">
        {filteredRepoData.map(eachFile => (
          <RepositoryItem key={eachFile.id} repoFile={eachFile} />
        ))}
      </ul>
    )
  }

  renderPageItems = () => {
    const {isStatus} = this.state
    switch (isStatus) {
      case 'SUCCESS':
        return this.renderOnSuccessView()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {isActiveTabId, isStatus} = this.state
    return (
      <div className="main-page">
        <div className="page-container">
          <h1 className="main-head">Popular</h1>
          <ul className="tab-items">
            {languageFiltersData.map(eachLanguage => (
              <LanguageItem
                filteredLanguage={eachLanguage}
                key={eachLanguage.id}
                isClicked={isActiveTabId === eachLanguage.id}
                isActiveTab={this.isActiveTab}
              />
            ))}
          </ul>
          {isStatus === 'IN_PROGRESS' ? (
            <div data-testid="loader">
              <Loader type="ThreeDots" color="#0284c7" height="80" width="80" />
            </div>
          ) : (
            this.renderPageItems()
          )}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
