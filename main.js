       const form = document.getElementById('attendanceForm');
    const tableBody = document.querySelector('#attendanceTable tbody');
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menuToggle');

    let records = [];
    let editIndex = -1;

    menuToggle.addEventListener('click', () => {
      sidebar.style.left = sidebar.style.left === '0px' ? '-250px' : '0px';
    });

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('employeeName').value;
      const date = document.getElementById('date').value;
      const timeIn = document.getElementById('timeIn').value;
      const timeOut = document.getElementById('timeOut').value;
      const status = document.getElementById('status').value;

      const record = { name, date, timeIn, timeOut, status };

      if (editIndex === -1) {
        records.push(record);
      } else {
        records[editIndex] = record;
        editIndex = -1;
        form.querySelector('button').textContent = 'Submit Attendance';
      }

      form.reset();
      renderTable();
    });

    function renderTable() {
      tableBody.innerHTML = '';
      records.forEach((rec, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${rec.name}</td>
          <td>${rec.date}</td>
          <td>${rec.timeIn}</td>
          <td>${rec.timeOut}</td>
          <td>${rec.status}</td>
          <td class="action-btns">
            <button class="edit-btn" onclick="editRecord(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteRecord(${index})">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    }

    window.editRecord = function(index) {
      const rec = records[index];
      document.getElementById('employeeName').value = rec.name;
      document.getElementById('date').value = rec.date;
      document.getElementById('timeIn').value = rec.timeIn;
      document.getElementById('timeOut').value = rec.timeOut;
      document.getElementById('status').value = rec.status;

      editIndex = index;
      form.querySelector('button').textContent = 'Update Attendance';
    }

    window.deleteRecord = function(index) {
      if (confirm("Are you sure you want to delete this record?")) {
        records.splice(index, 1);
        renderTable();
      }
    }
  
