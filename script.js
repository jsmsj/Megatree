console.info(
    'Made with %c♥%c by jsmsj',
    'color: #e25555', 'color: unset'
);
const markdown = window.markdownit()


megadata = async function (url) {
    var raw = JSON.stringify({
        "link": url
    });

    var requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: raw,
        redirect: 'follow'
    };

    try {
        // const response = await fetch("http://127.0.0.1:5000/get_mega_stuff", requestOptions);
        const response = await fetch("https://megajsmsj-1-n9032891.deta.app/get_mega_stuff", requestOptions);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

async function scrollDown() {
    var main = document.getElementsByTagName("html")[0];
    main.scrollTop = main.scrollHeight;
}

async function HandleClick(id) {
    myspinner = document.getElementById('myspinner')
    link = document.getElementById('Megalink').value
    if (!link) {
        alert('No Mega Link found')
        return
    }

    myspinner.classList.remove('hiddenclass')
    data = await megadata(link)
    myspinner.classList.add('hiddenclass')
    if (id == 1) {
        codeElement = document.getElementById('treediv')
        codeElement.innerHTML = `<pre><code class="language-ini hljs">${data.tree}</code></pre>`
        scrollDown();
    }
    else if (id == 2) {
        codeElement = document.getElementById('linkdiv')
        const links = data.only_links
        let result = "";
        for (let i = 0; i < links.length; i++) {
            result += `<a class="mylinks link-info link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" target="_blank" rel="noopener noreferrer" href="${links[i]}">${links[i]}</a>\n`;
        }
        codeElement.innerHTML = `<pre><code class="language-ini hljs">${result}</code></pre>`
        scrollDown();
    }
}

