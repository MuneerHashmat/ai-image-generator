import { useState } from "react";
import axiosInstance from "./axiosInstance";
import { SyncLoader } from "react-spinners";
import DownloadIcon from "@mui/icons-material/Download";

function App() {
  const [userPrompt, setUserPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setImageUrl(null);
    setLoading(true);
    try {
      const response = await axiosInstance.post("", { inputs: userPrompt });
      const data = response.data;
      const newImageUrl = URL.createObjectURL(data);
      setImageUrl(newImageUrl);
      setLoading(false);
    } catch (err) {
      alert("Could not generate image, please try another prompt!");
      console.log(err);
      setLoading(false);
    }
  };

  const downloadImage = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${userPrompt}.jpg`;
      a.click();
    } catch {
      alert("Something went wrong!");
    }
  };

  return (
    <>
      <div className=" mt-12 pb-0 mb-0 flex flex-col items-center gap-7">
        <div className="flex flex-col items-center gap-7 p-5 bg-gray-100 rounded-xl shadow-md">
          <h1 className="font-bold text-3xl">AI Image Generator</h1>
          <div className="flex gap-5">
            <input
              type="text"
              placeholder="Enter prompt"
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              className="p-2 rounded-lg text-xl outline-none border border-green-400"
            />
            <button
              onClick={generateImage}
              className="text-xl font-bold p-2 bg-green-400 rounded-lg hover:scale-105 transition-all"
            >
              Generate
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          {imageUrl && (
            <div className="w-[400px] h-[500px] rounded-lg overflow-hidden">
              <img src={imageUrl} className=" w-full h-[400px] object-cover" />
              <button
                onClick={downloadImage}
                className="bg-green-400 p-2 hover:bg-green-500 transition-all w-full h-100px text-xl font-bold"
              >
                Download
                <DownloadIcon
                  sx={{
                    fontSize: "25px",
                  }}
                />
              </button>
            </div>
          )}

          {loading && (
            <div className=" mt-[100px]">
              <SyncLoader color="#4ade80" size={20} margin={10} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
