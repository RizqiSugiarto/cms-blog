import { FC } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
interface EditorProps {
    className: string;
    placeholder: string;
}

const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' }
        ],
        ['link', 'image'],
        ['clean']
    ]
};

const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image'
];

const TextEditor: FC<EditorProps> = ({ placeholder, className }) => {
    return (
        <>
            <ReactQuill
                className={className}
                placeholder={placeholder}
                modules={modules}
                formats={formats}
            />
        </>
    );
};

export default TextEditor;
