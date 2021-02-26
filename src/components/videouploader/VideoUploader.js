import { React } from "react";
import { useDropzone } from "react-dropzone";

function Accept(props) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxFiles:1,

  });

  const acceptedFilesItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path}-{file.size} bytes
    </li>
  ));

  return (
    
    <section className="container">
      {console.log("ACCEPTED FILE:")}
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <em>(1 Only image file will be accepted)</em>
      </div>
      <aside>
        <h4>Accepted files</h4>
        <ul>{acceptedFilesItems}</ul>
      </aside>
    </section>
  );
}

export default Accept;