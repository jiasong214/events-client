export const uploadImage = async (image) => {
  const imgData = new FormData();

  imgData.append("file", image);
  imgData.append("upload_preset", "ml_default");
  imgData.append("cloud_name","dwhhlicmv");

  const res = await fetch("https://api.cloudinary.com/v1_1/dwhhlicmv/image/upload", {
    method:"POST",
    body: imgData
  });

  const data = await res.json();

  return data.url;
}