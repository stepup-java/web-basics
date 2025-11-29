// Navigation toggle for small screens
const navToggle = document.getElementById('nav-toggle');
const navbar = document.getElementById('navbar');
if(navToggle){
  navToggle.addEventListener('click', ()=>{
    if(navbar.style.display === 'flex'){
      navbar.style.display = 'none';
    } else {
      navbar.style.display = 'flex';
      navbar.style.flexDirection = 'column';
    }
  });
}

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth',block:'start'});
      // close mobile nav after click
      if(window.innerWidth <= 900 && navbar){ navbar.style.display = 'none'; }
    }
  });
});

// Simple contact form handler — opens mail client as fallback
const form = document.getElementById('contact-form');
if(form){
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if(!name || !email || !message){
      alert('Please complete all fields.');
      return;
    }
    // Fallback behavior: open the user's mail client with prefilled content
    const subject = encodeURIComponent('Portfolio contact from ' + name);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:asavarikodag@gmail.com?subject=${subject}&body=${body}`;
    // Optionally, show a lightweight confirmation
    form.querySelector('button[type="submit"]').textContent = 'Opening Mail...';
    setTimeout(()=>{ form.querySelector('button[type="submit"]').textContent = 'Send Message'; },3000);
  });
}

// Small accessibility enhancement: keyboard toggle
if(navToggle){
  navToggle.addEventListener('keydown', (e)=>{ if(e.key === 'Enter' || e.key === ' ') navToggle.click(); });
}

// Check whether the resume PDF exists and disable the download link with a helpful message if missing
;(function(){
  const resumeFile = 'Asavari_Ramchandra_Kodag_Resume.pdf';
  const anchors = Array.from(document.querySelectorAll(`a[href="${resumeFile}"]`));
  if(!anchors.length) return;
  anchors.forEach(anchor=>{
    // Try a HEAD request to verify file presence. If HEAD is blocked, fallback to GET.
    fetch(resumeFile, { method: 'HEAD' }).then(res=>{
      if(!res.ok){
        anchor.classList.add('missing-resume');
        anchor.setAttribute('aria-disabled','true');
        anchor.title = 'Resume file not found in site folder. Please add ' + resumeFile + ' to this folder.';
        anchor.addEventListener('click', function(e){ e.preventDefault(); alert('Resume not found. Please add ' + resumeFile + ' to this folder to enable download.'); });
      }
    }).catch(()=>{
      anchor.classList.add('missing-resume');
      anchor.setAttribute('aria-disabled','true');
      anchor.title = 'Resume file could not be fetched. Please add ' + resumeFile + ' to this folder.';
      anchor.addEventListener('click', function(e){ e.preventDefault(); alert('Resume not found or cannot be fetched. Please add ' + resumeFile + ' to this folder.'); });
    });
  });
})();
