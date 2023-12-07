import { MDBBtn } from "mdb-react-ui-kit";
import { useState } from "react";
function Post() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [promote, setPromote] = useState(false);
    const [status, setStatus] = useState("");
    const [missingInfo, setMissingInfo] = useState(false);
    const [success, setSuccess] = useState(false);
    const titleRegExp = /^.{8,}$/;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description || !category || !status || !titleRegExp.test(title)) {
            setMissingInfo(true);
            setSuccess(false);
            return;
        }
        setMissingInfo(false);
        setSuccess(true);
    };

    return (
        <div>
            {missingInfo && <div className="alert">
                Invalid data:
                <ul style={{ listStyleType: 'circle' }}>
                    <li>The title must be at least 8 characters.</li>
                    <li>The description is required.</li>
                    <li>Please, select a category.</li>
                    <li>Please , select a status.</li>
                </ul>
            </div>}
            {success && <div className="success">
                Form Successfully Submited !
            </div>}
            <div className="form">
                <form onSubmit={handleSubmit}>
                    Title: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <br />
                    Description: <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your post"></textarea>
                    <br />
                    Category:
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="1">Select 1</option>
                        <option value="2">Select 2</option>
                        <option value="3">Select 3</option>
                    </select> <br />

                    <input type="checkbox" checked={promote} onChange={() => setPromote(!promote)} /> Promote
                    <br />
                    Status:
                    <input type="radio" name="status" value="Draft" checked={status === "Draft"} onChange={() => setStatus("Draft")} /> Draft
                    <input type="radio" name="status" value="Published" checked={status === "Published"} onChange={() => setStatus("Published")} /> Published
                    <input type="radio" name="status" value="Archive" checked={status === "Archive"} onChange={() => setStatus("Archive")} /> Archive
                    <br />
                    <MDBBtn type="submit">Send</MDBBtn>
                </form>
            </div>
        </div>
    );
}

export default Post;