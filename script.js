//const api = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=tesla&type=video&key=[YOUR_API_KEY]"
// AIzaSyA4JYnLGfsjePGEdB5Lnf0_j6aGWy60dJE

// working key ===  AIzaSyAAxqIfYekCergIZloTSLg-_HaxU_OVoFg
// 


const result_div = document.querySelector("#search_results");

searchVideoTrending = async function () {
    try {
        let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=&type=video&key=AIzaSyAAxqIfYekCergIZloTSLg-_HaxU_OVoFg&maxResults=50`)

        let data = await res.json();

        let originalData = data.items;
        console.log(originalData);

        appendResult(originalData);
    }
    catch (err) {
        console.log(err);
    }
}

searchVideoTrending();

searchVideo = async function () {
    try {
        let video_query = document.querySelector("#video").value;

        let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${video_query}&type=video&key=AIzaSyBFf74Our2nzpc4rdAHzO-tjAKWevmYng0&maxResults=20`)

        let data = await res.json();

        let originalData = data.items;
        console.log(originalData);

        appendResult(originalData);
    }
    catch (err) {
        console.log("err:", err);
    }
}

const appendResult = (arr) => {

    result_div.innerHTML = "";

    arr.map((ele) => {
        let { snippet, id: { videoId } } = ele;

        let div = document.createElement("div");
        div.setAttribute("class", "allData")

        let titleOfv = document.createElement("h4");
        titleOfv.textContent = snippet.title;

        let thumbnail = document.createElement("img");
        thumbnail.setAttribute("class", "thumbnail")
        thumbnail.src = snippet.thumbnails.medium.url;

        let titleOfchannel = document.createElement("p");
        titleOfchannel.textContent = snippet.channelTitle;

        div.append(thumbnail, titleOfv, titleOfchannel)

        result_div.append(div);

        let data_to_send = {
            snippet, videoId,
        }

        div.onclick = () => {
            showV(data_to_send);
        }

        function showV(data) {
            localStorage.setItem("videos", JSON.stringify(data));
            window.location.href = "video.html"
        };
    });
}