import "./UploadBox.css";

function UploadBox({ file, onChange }) {

    return (

        <label className="upload-box">

            <div className="upload-icon">

                📄

            </div>

            <h3>

                Upload Portfolio CSV

            </h3>

            <p>

                Click to browse

            </p>

            <input

                type="file"

                accept=".csv"

                hidden

                onChange={onChange}

            />

            {

                file &&

                <div className="selected">

                    ✔ {file.name}

                </div>

            }

        </label>

    );

}

export default UploadBox;