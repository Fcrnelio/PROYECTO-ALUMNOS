const alumnos = [
  {
    nombre: "Fernanda",
    apellidoPaterno: "Cornelio",
    apellidoMaterno: "Alvarez",
    edad: 26,
    grupo: "B",
  },
];

const grupos = ["A"];

const materias = [];

const db = {
  grupos,
  materias,
  alumnos,
};

const tableStudentActionButtonsHtml = `
  <button
    type="button"
    class="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#studentData"
  >
    Ver mas
  </button>
  <button
    type="button"
    class="btn btn-success"
    data-bs-toggle="modal"
    data-bs-target="#studentDataEdit"
  >
    Editar
  </button>
  <button onclick="eliminarAlumno('value')" class="btn btn-danger">Eliminar</button>
`;

const tableSubjectActionButtonsHtml = `
  <button onclick="eliminarMateria('value')" class="btn btn-danger">Eliminar</button>
`;

const tableGroupActionButtonsHtml = `
  <button onclick="eliminarGrupo('value')" class="btn btn-danger">Eliminar</button>
`;

const tableAddSubjectInitialRow = `
  <td>
    <input
      id="new-subject-name"
      type="text"
      class="form-control"
      placeholder="Nombre de la materia"
    />
  </td>
  <td>
    <button onclick="agregarMateria()" class="btn btn-success">
      Agregar
    </button>
  </td>
`;

const tableAddGroupInitialRow = `          
  <td>
    <input
      id="new-group-name"
      type="text"
      class="form-control"
      placeholder="Nombre del grupo"
    />
  </td>
  <td>
    <button
      onclick="agregarGrupo()"
      type="button"
      class="btn btn-success"
    >
      Agregar
    </button>
  </td>
`;

const tableAddStudentInitialRow = `
  <td>
    <input
      id="newStudentName"
      type="text"
      class="form-control"
      placeholder="Nombre"
    />
  </td>
  <td>
    <input
      id="newFatherLastName"
      type="text"
      class="form-control"
      placeholder="Apellido Paterno"
    />
  </td>
  <td>
    <input
      id="newMotherLastName"
      type="text"
      class="form-control"
      placeholder="Apellido Materno"
    />
  </td>
  <td>
    <input
      id="newStudentAge"
      type="number"
      min="0"
      class="form-control"
      placeholder="Edad"
    />
  </td>
  <td>
    <select class="form-control" id="newStudentGroupSelect"></select>
  </td>
  <td>
  <button onclick="agregarAlumno()" class="btn btn-success">
    Agregar
  </button>
</td>
`;

function listarMaterias() {
  let tr;
  let td;
  let initialTr = document.createElement("tr");
  initialTr.innerHTML = tableAddSubjectInitialRow;
  const table = document.getElementById("subject-table-body");
  table.innerHTML = "";
  table.appendChild(initialTr);
  db.materias.forEach((materia) => {
    const actionButtons = document.createElement("td");
    actionButtons.innerHTML = tableSubjectActionButtonsHtml.replace(
      "value",
      materia
    );
    tr = document.createElement("tr");
    td = document.createElement("td");
    td.innerHTML = materia;
    tr.appendChild(td);
    tr.appendChild(actionButtons);
    table.appendChild(tr);
  });
}

function listarGrupos() {
  let tr;
  let td;
  const table = document.getElementById("group-table-body");
  table.innerHTML = "";
  let initialTr = document.createElement("tr");
  initialTr.innerHTML = tableAddGroupInitialRow;
  table.appendChild(initialTr);
  db.grupos.forEach((grupo) => {
    const actionButtons = document.createElement("td");
    actionButtons.innerHTML = tableGroupActionButtonsHtml.replace(
      "value",
      grupo
    );
    tr = document.createElement("tr");
    td = document.createElement("td");
    td.innerHTML = grupo;
    tr.appendChild(td);
    tr.appendChild(actionButtons);
    table.appendChild(tr);
  });
}

function listarAlumnos() {
  let tr;
  let td;
  const table = document.getElementById("students-table-body");
  table.innerHTML = "";
  let initialTr = document.createElement("tr");
  initialTr.innerHTML = tableAddStudentInitialRow;
  table.appendChild(initialTr);
  const groupSelect = document.getElementById("newStudentGroupSelect");
  db.grupos.forEach((grupo) => {
    const option = document.createElement("option");
    option.innerText = grupo;
    groupSelect.appendChild(option);
  });
  db.alumnos.forEach((alumno) => {
    const actionButtons = document.createElement("td");
    actionButtons.innerHTML = tableStudentActionButtonsHtml.replace(
      "value",
      alumno.nombre
    );
    tr = document.createElement("tr");
    Object.values(alumno).forEach((value) => {
      td = document.createElement("td");
      td.innerHTML = value;
      tr.appendChild(td);
      tr.appendChild(actionButtons);
    });
    table.appendChild(tr);
  });
}

function agregarGrupo() {
  const input = document.getElementById("new-group-name");
  const value = input.value.toString().toUpperCase();
  if (value.length > 0 && !grupos.includes(value)) {
    input.classList.remove("is-invalid");
    db.grupos.push(value);
    const actionButtons = document.createElement("td");
    actionButtons.innerHTML = tableGroupActionButtonsHtml.replace(
      "value",
      value
    );
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.innerHTML = value;
    tr.appendChild(td);
    tr.appendChild(actionButtons);
    const table = document.getElementById("group-table-body");
    table.appendChild(tr);
    input.value = null;
    listarAlumnos();
  } else {
    alert("Error, valor no valido");
    input.classList.add("is-invalid");
  }
}

function agregarMateria() {
  const input = document.getElementById("new-subject-name");
  const value = input.value.toString().toLowerCase();
  if (value.length > 0 && !materias.includes(value)) {
    input.classList.remove("is-invalid");
    db.materias.push(value);
    const actionButtons = document.createElement("td");
    actionButtons.innerHTML = tableSubjectActionButtonsHtml;
    actionButtons.innerHTML = tableSubjectActionButtonsHtml.replace(
      "value",
      value
    );
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.innerHTML = value;
    tr.appendChild(td);
    tr.appendChild(actionButtons);
    const table = document.getElementById("subject-table-body");
    table.appendChild(tr);
    input.value = null;
  } else {
    alert("Error, valor no valido");
    input.classList.add("is-invalid");
  }
}

function agregarAlumno() {
  const studentName = document.getElementById("newStudentName").value;
  const studentFatherLastName =
    document.getElementById("newFatherLastName").value;
  const studentMotherLastName =
    document.getElementById("newMotherLastName").value;
  const studentAge = document.getElementById("newStudentAge").value;
  const studentGroup = document.getElementById("newStudentGroupSelect").value;
  if (
    studentName.length > 0 &&
    studentAge.length > 0 &&
    studentFatherLastName.length > 0 &&
    studentMotherLastName.length > 0 &&
    studentGroup.length > 0
  ) {
    const newAlumno = {
      nombre: studentName,
      apellidoPaterno: studentFatherLastName,
      apellidoMaterno: studentMotherLastName,
      edad: studentAge,
      grupo: studentGroup,
      promedio: 10,
    };
    db.alumnos.push(newAlumno);
    alert("Alumno registrado");
    listarAlumnos();
  } else {
    alert("Campos invalidos");
  }
}

function eliminarGrupo(value) {
  if (confirm(`Desea Eliminar el grupo ${value}?`)) {
    const newList = db.grupos.filter((val) => val !== value);
    db.grupos = newList;
    listarGrupos();
  }
}

function eliminarMateria(value) {
  if (confirm(`Desea Eliminar la materia ${value}?`)) {
    const newList = db.materias.filter((val) => val !== value);
    db.materias = newList;
    listarMaterias();
  }
}

function eliminarAlumno(value) {
  if (confirm(`Desea eliminar al alumno ${value}?`)) {
    const newList = db.alumnos.filter((val) => val.nombre !== value);
    db.alumnos = newList;
    listarAlumnos();
  }
}

listarAlumnos();
listarMaterias();
listarGrupos();
