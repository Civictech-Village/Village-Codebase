import { useEffect, useRef } from "react";

export default function UploadWidget({ children }) {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: "ddj0t5srx",
      uploadPreset: "pa6owlcn",
    }, (error, result) => {
      console.log(result);
    });
  }, []);
  return (
    <button onClick={() => widgetRef.current.open()}>
        { children }
    </button>
  );
}
