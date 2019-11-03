import route from "../../config/routes.json";
export default function PostData(userdata, type) {
  console.log("post data invoked", userdata);
  return new Promise((resolve, reject) => {
    fetch(route.login.baseUrl + type, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userdata)
    })
      .then(response => {
        response.json();
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}
