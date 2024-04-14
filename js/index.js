document.addEventListener('DOMContentLoaded', function (){
    // fetch request for users
    function fetchUsers(searchName){
        fetch(`https://api.github.com/search/users?q=${searchName}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept:"application/vnd.github.v3+json"
            }
        })
        .then(res => res.json())
        .then(users => displayUsers(users.items))
        .catch(error => console.error(error,"Could not fetch"))
        
    }



    //fetch user repos
    function fetchUserRepos(username) {
        fetch(`https://api.github.com/users/${username}/repos`,{
            method: "GET",
            headers:{
                Accept: "application/vnd.github.v3+json"
            }
        })
        .then(res => res.json())
        //console.log(res)
        .then(repos => displayRepos(repos))
        .catch(error => console.error(error, 'Could not fetch repositories'))
        
    
    }
    fetchUserRepos()

    
        const search = document.getElementById('search')
        const form =  document.getElementById('github-form')
        const userList =  document.getElementById('user-list')
        const reposList =  document.getElementById('repos-list')

        //adding event listener on the button
        form.onsubmit = (e)=>{
            e.preventDefault()
            const searchName = search.value;
            if(searchName !== "") {
                fetchUsers(searchName)
            }
        }
    //function to display users
    function displayUsers (users){
        //const users = await fetchUsers()
        console.log(users)
        userList.innerHTML = "";
        users.forEach(user => {
            const li = document.createElement('li')
            const link = document.createElement('a')
            const avatar = document.createElement('img')
            avatar.onclick = function(){
                fetchUserRepos(user.login);
            };
            link.href = user.html_url;
            link.innerHTML = user.login;
            avatar.src = user.avatar_url;
            avatar.alt = user.login;
            li.appendChild(link);
            li.appendChild(avatar)
            userList.appendChild(li);
        });
    };
    displayUsers()

    //function to display repos
    function displayRepos (data){
        reposList.innerText = "";
        data.forEach(repo => {
            const li = document.createElement('li');
            const link = document.createElement('a')
            link.href =  repo.html_url
            link.innerText = repo.name;
            li.appendChild(link)
            reposList.appendChild(li);
        })

    }  

});