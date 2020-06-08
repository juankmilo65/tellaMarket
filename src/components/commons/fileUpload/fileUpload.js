import React, { Component } from "react";
import { connect } from "react-redux";
import imageCompression from "browser-image-compression";
import {
  setFile,
  uploadImage,
  uploadImageItem,
} from "./actions/fileUploadActions";

class FileUpload extends Component {
  state = {
    image: null,
    url: "",
    error: "",
  };

  b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  handleUpload = async (e) => {
    const { uploadImage, uploadImageItem } = this.props;

    var _URL = window.URL || window.webkitURL,
      file = e.target.files[0];
    var obj = new Object();
    obj["Image"] = file;
    // obj["IdPlan"] = 1;
    obj["IdItem"] = 1;
    uploadImageItem(obj);
    //image = new Image()
    // image.src = _URL.createObjectURL(newImage);
    // var type = file.type;

    // var options = {
    //   maxSizeMB: 1,
    //   maxWidthOrHeight: 700,
    //   useWebWorker: true,
    // };

    // var newImage = await imageCompression(file, options);

    // var reader = new FileReader();
    // reader.readAsDataURL(newImage);
    // reader.onloadend = function () {
    //   var endDate = new Date();
    //   endDate.setFullYear(endDate.getFullYear() + 5);
    //   var base64data = reader.result.replace(/^data:.+;base64,/, "");
    //   var obj = new Object();
    //   // obj["StartDate"] = new Date();
    //   // obj["EndDate"] = endDate;
    //   obj["Image"] = base64data;
    //   // obj["IdPlan"] = 1;
    //   obj["IdItem"] = 1;
    //   //obj["TableName"] = "itemimages";
    //   // uploadImage(obj);
    //   uploadImageItem(obj);
    // };
  };

  render() {
    return (
      <div>
        <label className="box active custom-file-upload">
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={this.handleUpload}
          />
        </label>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {
  setFile,
  uploadImage,
  uploadImageItem,
})(FileUpload);
