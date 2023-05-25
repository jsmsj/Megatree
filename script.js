console.info("Made with %c♥%c by jsmsj", "color: #e25555", "color: unset");
const markdown = window.markdownit();

megadata = async function (url) {
  var raw = JSON.stringify({
    link: url,
  });

  var requestOptions = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: raw,
    redirect: "follow",
  };

  try {
    // const response = await fetch("http://127.0.0.1:5000/get_mega_stuff", requestOptions);
    const response = await fetch(
      "https://megajsmsj-1-n9032891.deta.app/get_mega_stuff",
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

async function scrollToLoc(tag) {
  const y =
    document.getElementById(tag).getBoundingClientRect().top +
    window.scrollY -
    150;
  window.scroll({
    top: y,
    behavior: "smooth",
  });
}

async function HandleClick(id) {
  let myspinner = document.getElementById("myspinner");
  link = document.getElementById("Megalink").value;
  if (!link) {
    alert("No Mega Link found");
    return;
  }

  // container.classList.add("minimized");
  myspinner.classList.remove("hiddenclass");
  data = await megadata(link);
  myspinner.classList.add("hiddenclass");
  if (id == 1) {
    let codeElement = document.getElementById("treediv");
    codeElement.innerHTML = `<pre><code class="language-ini hljs">${data.tree}</code></pre>`;
    scrollToLoc("treediv");
  } else if (id == 2) {
    let codeElement = document.getElementById("linkdiv");
    const topCoords = codeElement.getBoundingClientRect().top;
    const links = data.only_links;
    let result = "";
    for (let i = 0; i < links.length; i++) {
      result += `<a class="mylinks link-info link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" target="_blank" rel="noopener noreferrer" href="${links[i]}">${links[i]}</a>\n`;
    }
    codeElement.innerHTML = `<pre><code class="language-ini hljs">${result}</code></pre>`;
    scrollToLoc("linkdiv");
  }
}

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  let container = document.getElementById("container");
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    container.classList.add("minimized");
  } else {
    container.classList.remove("minimized");
  }
}
