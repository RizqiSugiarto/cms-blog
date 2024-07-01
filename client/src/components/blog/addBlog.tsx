import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import TextEditor from '../common/textEditor';

const AddBlog: React.FC = () => {
    const [title, setTitle] = useState('');
    const [coverImageUrl, setCoverImageUrl] = useState('');
    const [tags, setTags] = useState('');
    // const [content, setContent] = useState('');

    const handlePublish = () => {
        const blogData = {
            title,
            coverImageUrl,
            tags
            // content,
        };
        console.log('Publishing blog:', blogData);
    };

    return (
        <div className="w-full h-full flex justify-center">
            <div className="w-[380px] h-auto border-2 mt-[56px] rounded-[15px] p-4">
                <div className="h-[30px] w-full flex justify-end">
                    <button className="w-[23px] h-[24px] rounded-full text-center border-2">
                        X
                    </button>
                </div>
                <div className="mt-[20px] flex flex-col space-y-5">
                    <div className="flex flex-col">
                        <label
                            htmlFor="title"
                            className="text-[16px] font-Jost font-medium"
                        >
                            Title of Blog
                        </label>
                        <input
                            id="title"
                            type="text"
                            className="border-2 rounded-[5px] p-2 focus:outline-none focus:outline-purpleCustom"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="coverImageUrl"
                            className="text-[16px] font-Jost font-medium"
                        >
                            Cover Image Blog Url
                        </label>
                        <input
                            id="coverImageUrl"
                            type="text"
                            className="border-2 rounded-[5px] p-2 focus:outline-none focus:outline-purpleCustom"
                            value={coverImageUrl}
                            onChange={(e) => setCoverImageUrl(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="tags"
                            className="text-[16px] font-Jost font-medium"
                        >
                            Tags
                        </label>
                        <select
                            id="tags"
                            className="border-2 rounded-[5px] p-2 focus:outline-none focus:outline-purpleCustom"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        >
                            <option value="">Select a tag</option>
                            <option value="sport">Sport</option>
                            <option value="health">Health</option>
                            <option value="business">Business</option>
                            <option value="tech">Tech</option>
                            <option value="finance">Finance</option>
                            <option value="fashion">Fashion</option>
                        </select>
                    </div>
                </div>
                <div className="w-full flex justify-center mt-4">
                    <div>
                        <div className="w-[350px] h-[400px]">
                            <TextEditor
                                className="bg-white h-[300px]"
                                placeholder={'Write something here...'}
                            />
                        </div>
                        <button
                            className="w-[350px] h-[40px] bg-purpleCustom mt-4 text-white font-medium font-Jost rounded-[5px]"
                            onClick={handlePublish}
                        >
                            Publish
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBlog;
