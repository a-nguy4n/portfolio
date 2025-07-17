
 // get the role from local storage 
 // if role is matched to the profile map
 // match each a tag with data attribute 
    // get the first child span and change text to corresponding text 

const profileKey = {
    browser: {
        about: "about me, not just the pixels",
        resume: "peek at the resume",
        projects: "projects worth checking out",
        contact: "start a conversation and say hi 👋",
        extras: "looking for bonus content? "
    },

    recruiter: {
        about: "want to learn more about me?",
        resume: "browse the resume",
        projects: "view featured projects",
        contact: "how can we connect? ",
        extras: "explore extras"
    },

    developer: {
        about: "behind the commits: about me",
        resume: "peek at the resume",
        projects: "see what I’ve coded lately",
        contact: "reach out if something clicked",
        extras: "extra content for the curious"
    }
}

export function searchSuggestions(){
    const role = localStorage.getItem('selectedRole') || 'default';
    const search_options = document.querySelectorAll(".search-option");
    // console.log("Current role is", role);
    // console.log("The Key is:", profileKey[role]);

    if (!role || role === "default" || !profileKey[role]){
        return;  
    }

    search_options.forEach((option) => {
        const main_section = option.getAttribute("data-target");
        const suggestionText = profileKey[role][main_section];
        // console.log("Current main section is: ", main_section);
       
        // console.log(suggestion);

        // console.log("Checker:", profileKey[role][main_section]);
        if(suggestionText){
            const suggestionSpan = option.querySelector("a span:first-child");
            if(suggestionSpan){
                suggestionSpan.textContent = suggestionText;
            }
        }
    });

    console.log("Updated Suggestions for the role:", role);
    return;
}


