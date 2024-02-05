import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormRepo = () => {
  const [url, setRepositoryLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [credential, setCredential] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const scanRepo = {
        url: url,
      };
      const response = await axios.post(`http://localhost:4000/api/detect/check`, scanRepo);
      const { data } = response;

      if (data && data.credentialsFound) {
        setCredential(data.credentialsFound);
        toast.success("Scan successful");
      } else {
        toast.info("No credentials found");
        setCredential("");
      }
    } catch (error) {
      console.error("Error scanning repo:", error);
      setError("Scan failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-16">
      <div className="max-w-md mx-auto bg-white p-8 border rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Scan Your Repository</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="repositoryLink" className="block text-sm font-medium text-gray-700 mb-2">
              Repository URL:
            </label>
            <input
              type="text"
              id="repositoryLink"
              name="repositoryLink"
              value={url}
              onChange={(e) => setRepositoryLink(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter repository URL"
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className={`bg-blue-500 text-white px-4 py-2 rounded-md ${loading ? "opacity-50 cursor-not-allowed" : ""}`} disabled={loading}>
              {loading ? "Scanning..." : "Scan"}
            </button>
          </div>
        </form>
        {error && <div className="text-red-500 mt-4">{error}</div>}
        {credential && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Credentials Found:</h3>
            <pre>{credential}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormRepo;
