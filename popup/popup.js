chrome.action.onClicked.addListener(function (tab) {
    alert('clicked');
});


let lst = document.querySelector('.tabs');

var srt = Sortable.create(lst, {
    animation: 150,
     ghostClass: 'ghost-class',
    onEnd: function(evt) {
        // This function will be called each time a drag operation ends
        handleDragEnd(evt);
    }
});

   

       
    //    document.querySelector("#settings_button > svg").addEventListener('click',function(){
           
    //         document.querySelector('.controls').classList.toggle('controls-active');
    //     });


            function fetchDials()
            {







                document.querySelector('.tabs').innerHTML = '';
                let values = {};

                let keys = Object.keys(localStorage);

                 if( keys.length > 0)
                    {
                        document.querySelector('.tabs').innerHTML = '';

                        for( let i=0; i<keys.length;i++)
                            {
                                if(keys[i] != 'ORDER')
                                    {
        
                                        values[i] = JSON.parse(localStorage.getItem(keys[i]));
                                    }
                            }
        
        
                        for (x in values){
        
                        // console.log(values[x].dialName,values[x].dialLink);
        
                        let dial = document.createElement("div");
                        let dialText =  document.createTextNode(values[x].dialName);
                        let ahref = document.createElement("a");
                        ahref.setAttribute("href",values[x].dialLink);
                        ahref.setAttribute("target","_self");
                        ahref.setAttribute('id',keys[x]);
                        dial.appendChild(dialText);
                        dial.classList.add("text-label");
        
                       let dialFavi  = document.createElement("img");
                        dialFavi.setAttribute("src",`https://www.google.com/s2/favicons?domain=${values[x].dialLink}`);    
                            dialFavi.setAttribute('loading','lazy');
                        let dialEditButton = document.createElement('button');
                        dialEditButton.setAttribute('id',keys[x]);
                        dialEditButton.innerHTML = '>';
                        dialEditButton.setAttribute('class','edit-button-dial');
        
                        ahref.appendChild(dialFavi);
                    
                        ahref.appendChild(dial);
                        
                        // ahref.appendChild(dialEditButton);
                        
                        ahref.classList.add("dial");
                        
                        
                        document.querySelector('.tabs').appendChild(ahref);
                        
                        
        
                        
                    
                    }
                   
                        let sortedOrder = JSON.parse(localStorage.getItem("ORDER"));
                        srt.sort(sortedOrder);
                        
                        handleDragEnd();


                    }
                    else 
                    {
                        document.querySelector('.tabs').innerHTML = '<div class="empty-tabs"></div> ';
                    }
             
                
            }



        fetchDials();

        let submitButton = document.querySelector('#addDial');



        submitButton.addEventListener('click',function(){


            

                let dialName = document.querySelector('#dialNameValue').value;
                let dialLink = document.querySelector('#dialLinkValue').value;
    
                let formattedDate = `${new Date().getDate()}${new Date().toLocaleString('default', { month: 'long' })}${new Date().getFullYear()}${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
                localStorage.setItem(formattedDate,JSON.stringify({dialName,dialLink}));
    
                
                document.querySelector('#dialNameValue').value = '';
                document.querySelector('#dialLinkValue').value = '';
                
                
                handleDragEnd();
                fetchDials();
            });


            
            let saveJson = document.querySelector('#saveJson');

            saveJson.addEventListener('click',function(){

                download(JSON.stringify(localStorage), 'json.txt', 'text/plain');
            });
           



            function handleDragEnd ()
            {
                let order = srt.toArray();
                // console.log(order);
                localStorage.setItem('ORDER',JSON.stringify(order));
                
            }


            function download(content, fileName, contentType) {
                var a = document.createElement("a");
                var file = new Blob([content], {type: contentType});
                a.href = URL.createObjectURL(file);
                a.download = fileName;
                a.click();
            }
            // download(jsonData, 'json.txt', 'text/plain');
    



            //Modal Bottom Drawer

            // Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


// modal drawer end




document.querySelector('.auto-fetch-btn').addEventListener('click',function(e){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let currentTabUrl = tabs[0].url;

        let dialLink = currentTabUrl;
        let dialName = currentTabUrl.split("/")[2].split(":")[0].replace("www.","").split(".")[0];

        // document.querySelector('#dialLinkValue').value = currentTabUrl;

        // document.querySelector('#dialNameValue').value = domainName;


        let formattedDate = `${new Date().getDate()}${new Date().toLocaleString('default', { month: 'long' })}${new Date().getFullYear()}${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
        localStorage.setItem(formattedDate,JSON.stringify({dialName,dialLink}));

        handleDragEnd();

        fetchDials();
    });
});







const button = document.querySelector('.auto-fetch-btn');

function toggleClass() {
	this.classList.toggle('active');
}

function addClass() {
	this.classList.add('finished');
}

function resetButton() {
	// Reset the button back to the original state
	button.classList.remove('active', 'finished');
}

// Event listeners for button clicks and transition
button.addEventListener('click', function() {
	toggleClass.call(button);

	// Delay for the "Action Completed" message to appear
	setTimeout(() => {
		addClass.call(button);

		// Reset the button after 2 seconds
		setTimeout(resetButton, 1000);
	}, 1000);  // 3 seconds delay before showing "Action Completed"
});



