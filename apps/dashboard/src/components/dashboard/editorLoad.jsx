function EditorLoad() {
  return <div id='editor-load'>
    <div id='editor-top'></div>
    <div id='editor-right'></div>
    <style jsx>{`
      #editor-load #editor-right {
        background: #333;
        width: 15%;
        height: 100%;
        position: absolute;
        right: 0;
      }
      #editor-load #editor-top {
        background: #222;
        width: 85%;
        height: 40px;
        position: absolute;
      }
    `}</style>
  </div>;
}