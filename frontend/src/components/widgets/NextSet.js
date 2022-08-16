import "./../../css/chatbot.css";

export default function NextSet(props) {
  return (
    <div>
      <button
        className="learning-option-button"
        onClick={() => props.actionProvider.handleNext()}
      >
        Load more questions
      </button>
    </div>
  );
}
