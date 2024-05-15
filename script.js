function fetchDataAndRender() {
    axios.get("http://localhost:3000/students")
        .then((res) => {
            let data = res.data;
            let body = "";
            let header = `<thead>
                <tr>
                    <th scope="col">Roll</th>
                    <th scope="col">Name</th>
                    <th scope="col">Branch</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>`;
            data.forEach((ele) => {
                let row = `<tr>
                    <th scope="row">${ele.id}</th>
                    <td>${ele.name}</td>
                    <td>${ele.branch}</td>
                    <td>${ele.mobile}</td>
                    <td>
                        <button class="btn btn-md" onclick="updateData(${ele.id})"> <span class="material-icons">edit</span></button>
                        <button class="btn btn-md" onclick="deleteData(${ele.id})"><span class="material-icons">delete</span></button>
                    </td>
                </tr>`;
                body += row;
            });
            $("#table").html(header + body);
        })
        .catch((err) => console.log(err));
}

$("#submit").click(() => {
    postData();
});

function postData() {
    var id = $('input[name="roll"]').val();
    var name = $('input[name="name"]').val();
    var branch = $('input[name="branch"]').val();
    var mobile = $('input[name="mobile"]').val();
    student = {
        "id": `${id}`,
        "name": `${name}`,
        "branch": `${branch}`,
        "mobile": `${mobile}`
    };
    console.log(student);

    axios.post(`http://localhost:3000/students/`, student)
        .then((res) => fetchDataAndRender())
        .catch((err) => console.log(err));
}

function deleteData(id) {
    axios.delete(`http://localhost:3000/students/${id}`)
        .then((res) => fetchDataAndRender())
        .catch((err) => console.log(err));
}

function updateData(id) {
    var newName = prompt("Enter new name:");
    var newBranch = prompt("Enter new branch:");
    var newMobile = prompt("Enter new mobile:");
    
    var updatedStudent = {
        name: newName,
        branch: newBranch,
        mobile: newMobile
    };

    axios.patch(`http://localhost:3000/students/${id}`, updatedStudent)
        .then((res) => {
            fetchDataAndRender(); // Update the table after successful update
            console.log("Data updated successfully");
        })
        .catch((err) => console.error("Error updating data:", err));
}

fetchDataAndRender();
