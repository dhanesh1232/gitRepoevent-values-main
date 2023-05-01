// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {filteredLanguage, isClicked, isActiveTab} = props
  const {language, id} = filteredLanguage
  const btnColor = isClicked ? 'active-btn' : 'btn-tab'
  const onClickOnActiveTab = () => {
    isActiveTab(id)
  }
  return (
    <li className="tab-item">
      <button type="button" className={btnColor} onClick={onClickOnActiveTab}>
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
