import { useState, useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import "./MyCKEditor.css";
import "ckeditor5/ckeditor5.css";

import {
  ClassicEditor,
  AccessibilityHelp,
  Autoformat,
  AutoImage,
  Base64UploadAdapter,
  BlockQuote,
  Bold,
  Essentials,
  Heading,
  ImageBlock,
  ImageCaption,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  PasteFromOffice,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TodoList,
  Underline,
} from "ckeditor5";

import translations from "ckeditor5/translations/ko.js";

interface MyCKEditorProps {
  onChange?: (content: string) => void;
}

const MyCKEditor = ({ onChange }: MyCKEditorProps) => {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const editorConfig = {
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "heading",
        "|",
        "bold",
        "italic",
        "underline",
        "|",
        "link",
        "insertImage",
        "mediaEmbed",
        "insertTable",
        "blockQuote",
        "|",
        "bulletedList",
        "numberedList",
        "todoList",
        "outdent",
        "indent",
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      AccessibilityHelp,
      Autoformat,
      AutoImage,
      Base64UploadAdapter,
      BlockQuote,
      Bold,
      Essentials,
      Heading,
      ImageBlock,
      ImageCaption,
      ImageInsert,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      MediaEmbed,
      PasteFromOffice,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      TodoList,
      Underline,
    ],
    heading: {
      options: [
        {
          model: "paragraph" as const,
          title: "Paragraph" as const,
          class: "ck-heading_paragraph as const",
        },
        {
          model: "heading1" as const,
          view: "h1" as const,
          title: "Heading 1" as const,
          class: "ck-heading_heading1" as const,
        },
        {
          model: "heading2" as const,
          view: "h2" as const,
          title: "Heading 2" as const,
          class: "ck-heading_heading2" as const,
        },
        {
          model: "heading3" as const,
          view: "h3" as const,
          title: "Heading 3" as const,
          class: "ck-heading_heading3" as const,
        },
        {
          model: "heading4" as const,
          view: "h4" as const,
          title: "Heading 4" as const,
          class: "ck-heading_heading4" as const,
        },
        {
          model: "heading5" as const,
          view: "h5" as const,
          title: "Heading 5" as const,
          class: "ck-heading_heading5" as const,
        },
        {
          model: "heading6" as const,
          view: "h6" as const,
          title: "Heading 6" as const,
          class: "ck-heading_heading6" as const,
        },
      ],
    },
    image: {
      toolbar: [
        "toggleImageCaption",
        "imageTextAlternative",
        "|",
        "imageStyle:inline",
        "imageStyle:wrapText",
        "imageStyle:breakText",
        "|",
        "resizeImage",
      ],
    },
    initialData:
      "<h2>포트폴리오 생성 공간에 오신 것을 환영합니다🎉</h2>\n<p>나만의 포트폴리오를 만들어보세요</p>  ",
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: "https://",
      decorators: {
        toggleDownloadable: {
          mode: "manual" as const,
          label: "Downloadable",
          attributes: {
            download: "file",
          },
        },
      },
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true,
      },
    },
    placeholder: "내용을 입력해주세요!",
    table: {
      contentToolbar: [
        "tableColumn",
        "tableRow",
        "mergeTableCells",
        "tableProperties",
        "tableCellProperties",
      ],
    },
    translations: [translations],
  };

  return (
    <div>
      <div className="main-container">
        <div
          className="editor-container editor-container_classic-editor"
          ref={editorContainerRef}
        >
          <div className="editor-container__editor">
            <div ref={editorRef}>
              {isLayoutReady && (
                <CKEditor
                  editor={ClassicEditor}
                  config={editorConfig}
                  onChange={(_, editor) => {
                    const data = editor.getData(); // 포트폴리오 작성내용(html)
                    if (onChange) {
                      onChange(data);
                    }
                    // console.log(data);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCKEditor;
