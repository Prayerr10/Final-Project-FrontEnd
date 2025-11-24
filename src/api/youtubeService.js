export const convertYoutubeLink = async (url) => {
  if (!url) {
    throw new Error("Link tidak boleh kosong.");
  }

  const isYoutube = url.includes("youtube.com") || url.includes("youtu.be");
  if (!isYoutube) {
    throw new Error("Link tidak valid! Pastikan link berasal dari YouTube.");
  }

  return new Promise((resolve) => {
    console.log(`[Service] Sedang memproses URL: ${url}`); // Untuk debugging di Console
    setTimeout(() => {
      const mockData = {
        id: Date.now().toString(), 
        title: "Lofi Girl - beats to relax/study to",
        artist: "Lofi Girl",
        youtubeId: "jfKfPfyJRdk",
        coverUrl: "https://img.youtube.com/vi/jfKfPfyJRdk/maxresdefault.jpg",
        duration: "Live",
        downloadUrl: "#",
        isSuccess: true
      };
      resolve(mockData);
    }, 1500); 
  });
};