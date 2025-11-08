(function(){
  // Simple data - no localStorage
  const classes = [
    { id: 'CPP101', name: 'C++' },
    { id: 'WEB201', name: 'WebDevelopment' },
    { id: 'PY101', name: 'Python' },
    { id: 'JAVA101', name: 'Java' }
  ];
  
  let currentClass = 'WEB201';
  let tasks = [
    { id: 1, title: 'Make a WireFrame', due: '2025-01-26', completed: false, comments: [] },
    { id: 2, title: 'Join Telegram', due: '2025-01-25', completed: true, comments: ['Joined group'] }
  ];

  // Set theme
  document.body.classList.add('theme-dark');

  // Create tabs
  const tabs = document.getElementById('course-tabs');
  if(tabs){
    tabs.innerHTML = '';
    classes.forEach(cls => {
      const link = document.createElement('button');
      link.type = 'button';
      link.className = 'nav-link' + (cls.id === currentClass ? ' active' : '');
      link.textContent = cls.name;
      link.addEventListener('click', () => {
        currentClass = cls.id;
        location.reload();
      });
      const li = document.createElement('li');
      li.className = 'nav-item';
      li.appendChild(link);
      tabs.appendChild(li);
    });
  }

  // Set class name
  const classNameEl = document.getElementById('class-name');
  if(classNameEl){
    const cls = classes.find(c => c.id === currentClass);
    if(cls) classNameEl.textContent = cls.name;
  }

  // ToDo page
  if(document.body.dataset.page === 'todo'){
    const taskList = document.getElementById('task-list');
    const addBtn = document.getElementById('add-task-btn');

    function renderTasks(){
      taskList.innerHTML = '';
      tasks.forEach(task => {
        const taskEl = document.createElement('div');
        taskEl.className = 'p-3 rounded task-card';
        taskEl.innerHTML = `
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <div class="task-title">${task.title}</div>
              <div class="task-meta mt-1">Due: ${task.due}</div>
            </div>
            <div class="d-flex gap-2">
              <span class="badge ${task.completed ? 'badge-complete' : 'badge-pending'}">
                ${task.completed ? 'Completed' : 'Pending'}
              </span>
              <button class="btn btn-sm btn-outline-success">
                ${task.completed ? 'UnComplete' : 'Complete'}
              </button>
            </div>
          </div>
          <div class="mt-3">
            <div class="vstack gap-2" data-comments></div>
            <div class="input-group mt-2" data-input>
              <input type="text" class="form-control" placeholder="Add a comment">
              <button class="btn btn-outline-primary">Comment</button>
            </div>
          </div>`;
        
        // Complete button
        const completeBtn = taskEl.querySelector('button.btn-outline-success');
        completeBtn.addEventListener('click', () => {
          task.completed = !task.completed;
          renderTasks();
        });
        
        // Comments
        const commentsBox = taskEl.querySelector('[data-comments]');
        task.comments.forEach(comment => {
          const p = document.createElement('div');
          p.className = 'small text-muted';
          p.textContent = '• ' + comment;
          commentsBox.appendChild(p);
        });
        
        // Add comment
        const inputWrap = taskEl.querySelector('[data-input]');
        const input = inputWrap.querySelector('input');
        const commentBtn = inputWrap.querySelector('button');
        commentBtn.addEventListener('click', () => {
          if(!input.value.trim()) return;
          task.comments.push(input.value.trim());
          input.value = '';
          renderTasks();
        });
        
        taskList.appendChild(taskEl);
      });
    }

    // Add task
    addBtn.addEventListener('click', () => {
      const title = prompt('Task title');
      if(!title) return;
      const newTask = {
        id: Date.now(),
        title: title,
        due: '2025-01-28',
        completed: false,
        comments: []
      };
      tasks.unshift(newTask);
      renderTasks();
    });

    renderTasks();
  }

  // Join class modal
  const fab = document.getElementById('fab-join');
  if(fab){
    const modalEl = document.getElementById('joinClassModal');
    const modal = new bootstrap.Modal(modalEl);
    fab.addEventListener('click', () => modal.show());
    
    document.getElementById('join-class-submit')?.addEventListener('click', () => {
      const code = document.getElementById('join-class-code').value.trim();
      if(!code) return;
      
      // Add new class
      classes.push({id: code, name: code});
      currentClass = code;
      
      modal.hide();
      location.reload();
    });
  }
})();


