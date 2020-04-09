const React = require('react');
const Automerge = require('automerge')

const TextEditor = ({currentDoc, events, updateProps}) => {

  // if we don't already have a shared doc, create a new one
  if (!currentDoc) {
    currentDoc = Automerge.init();
    updateProps({currentDoc: currentDoc})
  }

  let onKeyPressed = () => {}
  const newDoc = Automerge.change(currentDoc, doc => {
    doc.text = new Automerge.Text()
    doc.text.insertAt(0, 'h', 'e', 'l', 'l', 'o')
    onKeyPressed = (e) => {
      let cursor = e.target.selectionStart
      if (e.keyCode === 8) {
        doc.text.deleteAt(cursor);
      } else {
        doc.text.insertAt(cursor, String.fromCharCode(e.keyCode));
      }
    }
  });

  const inputEl = React.useRef(null);

  return (
    <div className="w-64">
      <input ref={inputEl}
        type="text"
        className="m-2 border border-gray-400 rounded p-2"
        onKeyDown={onKeyPressed}
        value={newDoc.text.toString()}
      >
      </input>
    </div>
  );
}

module.exports = TextEditor;
