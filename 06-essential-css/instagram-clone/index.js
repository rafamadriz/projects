const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.jpg",
        post: "images/post-vangogh.jpg",
        comment: "just took a few mushrooms lol",
        likes: 21
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4
    },
        {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152
    }
]


const createPost = (data) => {
    const postSection = document.createElement("section");
    postSection.className = "post-content";

    const userInfo = document.createElement("div");
    userInfo.className = "user-info"

    const avatar = document.createElement("img");
    avatar.className = "user-avatar"
    avatar.src = data.avatar;

    const textInfo = document.createElement("div");
    textInfo.className = "text-info"
    const name = document.createElement("p");
    name.className = "name"
    name.textContent = data.name;

    const location = document.createElement("p");
    location.className = "location"
    location.textContent = data.location;

    userInfo.append(avatar);
    userInfo.append(textInfo);
    textInfo.append(name);
    textInfo.append(location);

    postSection.append(userInfo);

    const postImage = document.createElement("img");
    postImage.className = "post-image"
    postImage.src = data.post

    postSection.append(postImage);

    const postBody = document.createElement("div");
    postBody.className = "post-body";

    const postBodyIcons = document.createElement("div")
    postBodyIcons.className = "post-body-icons";

    const share = document.createElement("img");
    share.src = "./images/icon-dm.png"
    const like = document.createElement("img");
    like.src = "./images/icon-heart.png"
    const comment = document.createElement("img");
    comment.src = "./images/icon-comment.png"

    postBodyIcons.append(like);
    postBodyIcons.append(comment);
    postBodyIcons.append(share);

    postBody.append(postBodyIcons);

    const likesCount = document.createElement("p");
    likesCount.className = "likes-count";
    likesCount.textContent = `${data.likes} likes`

    const commentUsername = document.createElement("span");
    commentUsername.className = "comment-username";
    commentUsername.textContent = data.username;

    const postComment = document.createElement("p");
    postComment.className = "post-comment"
    postComment.append(commentUsername)
    postComment.append(` ${data.comment}`)

    postBody.append(likesCount);
    postBody.append(postComment);

    postSection.append(postBody);

    return postSection
}

let postsEl = ""
for (const post of posts) {
    postsEl += createPost(post).outerHTML;
}

const postsSection = document.querySelector("main .container");
postsSection.innerHTML = postsEl
