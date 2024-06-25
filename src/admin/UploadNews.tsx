import React, { useState } from 'react'
import { ApiClient } from "adminjs"
import { DropZone, Loader, Button } from '@adminjs/design-system'
import csvtojson from "csvtojson";
import axios from 'axios';


const api = new ApiClient()

let headers = ["Heading", "Description", "Category"];

function UploadNews(props) {
    const [file, setFile] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const onUpload = async (file) => {
        // save the file in current folder
        console.log(file, "file");
        console.log(process.env.WEB_URL);

        setFile(file)
    }

    const uploadHandler = async () => {
        try {
            if (file.length === 0) {
                return;
            }

            

            let curFile = file[0];
            console.log(curFile, "curFile");

            const reader = new FileReader();
            reader.onload = async (e) => {

                const text = e.target.result;
                let jsonData = await csvtojson().fromString(text);
                console.log(jsonData, "jsonData");

                const fileName = curFile.name;
                
                let result = await api.resourceAction({
                    resourceId: 'newsData',
                    actionName: "UploadNews",
                    data: {
                        fileName: fileName,
                        newsData: jsonData
                    }
                })
                if (result.status) {
                    window.location = props.resource.href;
                } else {
                    alert("Error while uploading users");
                }
            };
            reader.readAsText(curFile);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <React.Fragment>
            {
                isLoading ? <Loader /> : <div style={{
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <DropZone style={{
                        width: "100%"
                    }} multiple={false} onChange={onUpload} validate={{
                        mimeTypes: ["text/csv"]
                    }}></DropZone>
                    <Button style={{
                        margin: "auto",
                        marginTop: "20px"
                    }} variant="primary" onClick={uploadHandler}>Save</Button>
                </div>
            }
        </React.Fragment>
    )
}

export default UploadNews;