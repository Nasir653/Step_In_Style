import { useState, useEffect, useRef, useMemo, useContext } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    ClassicEditor,
    Alignment,
    AutoLink,
    Autosave,
    BlockQuote,
    Bold,
    Bookmark,
    Code,
    Essentials,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    GeneralHtmlSupport,
    Heading,
    Highlight,
    HorizontalLine,
    Indent,
    IndentBlock,
    Italic,
    Link,
    Paragraph,
    RemoveFormat,
    SpecialCharacters,
    Strikethrough,
    Style,
    Subscript,
    Superscript,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TextPartLanguage,
    Title,
    Underline,
    WordCount
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import './Editor.css';
import { context } from '../Context/Store';

const LICENSE_KEY = 'GPL'; // Replace with your actual CKEditor license key if needed.

export default function App() {

    const { UserBlogs } = useContext(context);


    const editorRef = useRef(null);
    const editorWordCountRef = useRef(null);
    const [isLayoutReady, setIsLayoutReady] = useState(false);
    const [formData, setFormData] = useState({
        content: "",
    });

    useEffect(() => {
        setIsLayoutReady(true);
        return () => setIsLayoutReady(false);
    }, []);

    const { editorConfig } = useMemo(() => {
        if (!isLayoutReady) return {};
        return {
            editorConfig: {
                toolbar: {
                    items: [
                        'textPartLanguage', '|',
                        'heading', 'style', '|',
                        'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|',
                        'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', 'code', 'removeFormat', '|',
                        'specialCharacters', 'horizontalLine', 'link', 'bookmark', 'insertTable', 'highlight', 'blockQuote', '|',
                        'alignment', '|',
                        'outdent', 'indent'
                    ],
                    shouldNotGroupWhenFull: false
                },
                plugins: [
                    Alignment, AutoLink, Autosave, BlockQuote, Bold, Bookmark, Code, Essentials,
                    FontBackgroundColor, FontColor, FontFamily, FontSize, GeneralHtmlSupport, Heading, Highlight,
                    HorizontalLine, Indent, IndentBlock, Italic, Link, Paragraph, RemoveFormat,
                    SpecialCharacters, Strikethrough, Style, Subscript, Superscript, Table, TableCaption,
                    TableCellProperties, TableColumnResize, TableProperties, TableToolbar,
                    TextPartLanguage, Title, Underline, WordCount
                ],
                fontFamily: { supportAllValues: true },
                fontSize: { options: [10, 12, 14, 'default', 18, 20, 22], supportAllValues: true },
                heading: {
                    options: [
                        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                        { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                        { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                        { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
                    ]
                },
                htmlSupport: {
                    allow: [{ name: /^.*$/, styles: true, attributes: true, classes: true }]
                },
                licenseKey: LICENSE_KEY,
                link: {
                    addTargetToExternalLinks: true,
                    defaultProtocol: 'https://',
                    decorators: {
                        toggleDownloadable: {
                            mode: 'manual',
                            label: 'Downloadable',
                            attributes: { download: 'file' }
                        }
                    }
                },
                placeholder: 'Type or paste your content here!',
                style: {
                    definitions: [
                        { name: 'Article category', element: 'h3', classes: ['category'] },
                        { name: 'Title', element: 'h2', classes: ['document-title'] },
                        { name: 'Subtitle', element: 'h3', classes: ['document-subtitle'] },
                        { name: 'Info box', element: 'p', classes: ['info-box'] },
                        { name: 'Side quote', element: 'blockquote', classes: ['side-quote'] },
                        { name: 'Marker', element: 'span', classes: ['marker'] },
                        { name: 'Spoiler', element: 'span', classes: ['spoiler'] },
                        { name: 'Code (dark)', element: 'pre', classes: ['fancy-code', 'fancy-code-dark'] },
                        { name: 'Code (bright)', element: 'pre', classes: ['fancy-code', 'fancy-code-bright'] }
                    ]
                },
                table: {
                    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
                }
            }
        };
    }, [isLayoutReady]);


    const handleSubmit = () => {
        if (editorRef.current) {
            const data = editorRef.current.getData();
            setFormData((prevFormData) => ({
                ...prevFormData,
                content: data,
            }));
            console.log("🔹 Submitted Data:", formData);
            UserBlogs(formData);
        }
    };

    return (
        <div className="main-container">
            <div className="editor-container editor-container_classic-editor editor-container_include-style editor-container_include-word-count">
                <div className="editor-container__editor">
                    <div>
                        {editorConfig && (
                            <CKEditor
                                editor={ClassicEditor}
                                config={editorConfig}
                                onReady={editor => {
                                    editorRef.current = editor;
                                    const wordCount = editor.plugins.get('WordCount');
                                    if (editorWordCountRef.current) {
                                        editorWordCountRef.current.appendChild(wordCount.wordCountContainer);
                                    }
                                }}
                            />
                        )}
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
                <div className="editor_container__word-count" ref={editorWordCountRef}></div>
            </div>
        </div>
    );
}
