// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repoFile} = props
  const {name, avatarUrl, forksCount, starsCount, issuesCount} = repoFile
  return (
    <li className="list-repo">
      <img src={avatarUrl} alt={name} className="repo-img" />
      <h1 className="repo-head">{name}</h1>
      <div className="info-con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png "
          alt="stars"
          className="repo-star"
        />
        <p className="info-para">{starsCount} stars</p>
      </div>
      <div className="info-con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="repo-star"
        />
        <p className="info-para">{forksCount} forks</p>
      </div>
      <div className="info-con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="repo-star"
        />
        <p className="info-para">{issuesCount} issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
