// Feature cards 
const features = [
  {
    icon: "/Images/basil_document-solid.png",
    title: "Stay Organized",
    text: "Keep all your job applications in one place. Easily store important details like company name, job role, application date, and notes."
  },
  {
    icon: "/Images/entypo_progress-two.png",
    title: "Track Your Progress",
    text: "Monitor the status of every application from Applied to Interview, Offer, or Rejected."
  },
  {
    icon: "/Images/mdi_user-edit.png",
    title: "Easy to Use",
    text: "Our intuitive dashboard makes it easy to add applications, update statuses, and manage your job search efficiently."
  },
  {
    icon: "/Images/gridicons_reader-following-conversation.png",
    title: "Follow-Ups",
    text: "Set reminders to follow up with recruiters at the right time."
  },
  {
    icon: "/Images/tabler_briefcase-filled.png",
    title: "Job Recommendation (Coming soon)",
    text: "Exclusive access to vetted network of industry leaders and hiring partners."
  },
  {
    icon: "/Images/mdi_analytics.png",
    title: "Progress Analytics (Coming soon)",
    text: "Transforms your raw application data into a visual roadmap of your journey."
  }
];


// Testimonial cards
const testimonials = [
  { img: "/Images/Ellipse 8.png", name: "John Eli", text: "This tracker actually makes me want to apply for more roles because seeing my progress is so addicting. 10/10 recommend." },
  { img: "/Images/Ellipse 10.png", name: "David Smith", text: "I used to have 40 tabs open and zero idea where I stood. Now I just check my dashboard, see my progress and I’m back in the zone. " },
  { img: "/Images/Ellipse 11.png", name: "Sarah Johnson", text: "I went from 'I think I applied to that' to 'I know exactly where I stand.' Seeing my win rates was it for me." },
  { img: "/Images/Ellipse 12.png", name: "Haniel Daniel", text: "Tracking job applications used to be stressful. This platform made it easy to stay organized." },
  { img: "/Images/Ellipse 9.png", name: "Daniel Efe", text: "I missed three deadlines last semester, Since switching, I haven't missed a beat. I highly reccommend" },
  { img: "/Images/Ellipse 13.png", name: "Josephine Joe", text: "The follow-up reminders are extremely helpful. They keep me proactive during my job search." },
  { img: "/Images/Ellipse 14.png", name: "John Glory", text: "I could see exactly how many apps it took to get one interview, and that clarity kept me grinding." },
  { img: "/Images/Ellipse 15.png", name: "Phile Isaac", text: "I used to dread checking my applications. Now, seeing my progress visualized is the highlight of my morning." }
];

// Render features
const featuresGrid = document.getElementById("features-grid");
features.forEach(f => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="icon-box"><img src="${f.icon}" alt="${f.title}"></div>
    <h3>${f.title}</h3>
    <p>${f.text}</p>
  `;
  featuresGrid.appendChild(card);
});


// Render testimonials
const testimonialGrid = document.getElementById("testimonial-grid");
testimonials.forEach(t => {
  const card = document.createElement("div");
  card.className = "t-card";
  card.innerHTML = `
    <div class="user-info">
      <img src="${t.img}" alt="${t.name}">
      <strong>${t.name}</strong>
    </div>
    <p>${t.text}</p>
  `;
  testimonialGrid.appendChild(card);
});
