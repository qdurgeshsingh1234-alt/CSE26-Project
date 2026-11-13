function get(id) {
    return document.getElementById(id);
}

function today() {
    var d = new Date();
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    return days[d.getDay()] + ", " + d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
}

function updateCount() {
    var c = get("count");
    if (!c) return;
    var page = location.pathname.split("/").pop();
    if (page == "profile.html") c.innerHTML = "Total Volunteers: " + document.getElementsByClassName("profile-card").length;
    if (page == "manage.html") c.innerHTML = "Total Campaigns: " + document.getElementsByClassName("campaign-card").length;
    if (page == "assign.html") c.innerHTML = "Total Assignments: " + document.getElementsByClassName("assignment-card").length;
}

function createCampaign() {
    var name = prompt("Campaign name:");
    if (!name) return;
    var loc = prompt("Location:");
    var need = prompt("Volunteers Needed:");
    var grid = get("grid");
    var html = '<div class="campaign-card">';
    html += '<h3>' + name + '</h3>';
    html += '<p><strong>Location:</strong> ' + loc + '</p>';
    html += '<p><strong>Volunteers Needed:</strong> ' + need + '</p>';
    html += '<p><strong>Status:</strong> <span class="status active">Active</span></p>';
    html += '<button class="small-btn" onclick="deleteCard(this)">Delete</button>';
    html += '</div>';
    grid.innerHTML += html;
    updateCount();
}

function deleteCard(btn) {
    var card = btn.parentNode;
    card.parentNode.removeChild(card);
    updateCount();
}

function filterCampaigns(type, btn) {
    var cards = document.getElementsByClassName("available-card");
    for (var i = 0; i < cards.length; i++) {
        var st = cards[i].getElementsByClassName("status")[0].innerHTML;
        cards[i].style.display = (type == "all" || st == type) ? "block" : "none";
    }
    var tabs = document.getElementsByClassName("filter-btn");
    for (var j = 0; j < tabs.length; j++) tabs[j].classList.remove("active-filter");
    btn.classList.add("active-filter");
}

function joinCampaign(btn) {
    var card = btn.parentNode;
    var spots = card.getElementsByClassName("spots")[0];
    var left = parseInt(spots.innerHTML) - 1;
    if (left < 0) {
        btn.innerHTML = "Full";
        btn.disabled = true;
        return;
    }
    spots.innerHTML = left;
    btn.innerHTML = "Joined";
    btn.disabled = true;
    if (left == 0) alert("You took the last spot!");
    else alert("Joined! " + left + " spots left.");
}

function searchVolunteers() {
    var q = get("search").value.toLowerCase();
    var cards = document.getElementsByClassName("profile-card");
    for (var i = 0; i < cards.length; i++) {
        cards[i].style.display = cards[i].innerHTML.toLowerCase().indexOf(q) > -1 ? "block" : "none";
    }
}

function contactVolunteer(name) {
    alert("Contacting " + name + "...\nEmail sent!");
}

function assignVolunteer() {
    var v = get("volunteer").value;
    var c = get("campaign").value;
    var r = get("role").value;
    var s = get("shift").value;
    if (!v || !c || !r || !s) {
        alert("Please fill all fields");
        return;
    }
    var grid = get("grid");
    var html = '<div class="assignment-card">';
    html += '<h3>' + v + '</h3>';
    html += '<p><strong>Campaign:</strong> ' + c + '</p>';
    html += '<p><strong>Assigned Role:</strong> ' + r + '</p>';
    html += '<p><strong>Shift:</strong> ' + s + '</p>';
    html += '</div>';
    grid.innerHTML += html;
    get("volunteer").value = "";
    get("campaign").value = "";
    get("role").value = "";
    get("shift").value = "";
    updateCount();
    alert("Assigned successfully!");
}

window.onload = function () {
    var page = location.pathname.split("/").pop();
    if (page == "index.html") {
        var box = get("date");
        if (box) box.innerHTML = today();
    }
    updateCount();
    if (page == "shift.html") {
        var rows = document.getElementsByClassName("schedule-row");
        for (var i = 0; i < rows.length; i++) {
            rows[i].onclick = function () {
                this.style.background = "rgba(255,255,255,0.25)";
            };
        }
    }
    if (page == "dashboard.html") {
        var stats = document.getElementsByClassName("stat-card");
        for (var i = 0; i < stats.length; i++) {
            stats[i].onclick = function () {
                alert("Value: " + this.getElementsByClassName("stat-number")[0].innerHTML);
            };
        }
    }
};