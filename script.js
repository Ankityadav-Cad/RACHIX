// Update this central configuration before launch.
// Current project descriptions and images are illustrative placeholders.
const CONFIG = {
  email: "hello@rachix.example",
  instagram: "",
  whatsapp: "",
  formEndpoint: ""
};

const projects = [
  {
    number: "PROJECT 01",
    title: "Tensile Architecture",
    category: "Conceptual membrane canopy",
    tags: "ARCHITECTURE / TENSILE DESIGN",
    description: "Illustrative exploration of flowing membrane geometry and supporting structure. Replace this with approved brief, approach, and outcome details.",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1500&q=82",
    alt: "Illustrative modern architectural canopy concept"
  },
  {
    number: "PROJECT 02",
    title: "Structural Exploration",
    category: "Parametric structural concept",
    tags: "3D DESIGN / ENGINEERING",
    description: "Placeholder for a parametric structural concept. Add verified details and appropriate CAD or analysis imagery before presenting as completed work.",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=82",
    alt: "Abstract modern structural architecture"
  },
  {
    number: "PROJECT 03",
    title: "Precision Fabrication",
    category: "Custom engineered assembly",
    tags: "CAD / FABRICATION",
    description: "Placeholder for build-oriented design and fabrication. Replace with real assembly photographs, approved drawings, and accurate project context.",
    image: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&w=1300&q=82",
    alt: "Architectural construction and structural detail"
  },
  {
    number: "PROJECT 04",
    title: "Simulation & Analysis",
    category: "Digital engineering study",
    tags: "SIMULATION / OPTIMIZATION",
    description: "Illustrative slot for a digital engineering study. Do not add performance claims or results unless verified and approved.",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1300&q=82",
    alt: "Architectural form study with geometric lines"
  }
];

const services = [
  ["01", "CREATIVE DESIGN", "Concept development, design exploration, visualisation, and translating initial ideas into practical design directions.", "✳"],
  ["02", "CAD & ENGINEERING", "3D modelling, technical drawings, design detailing, assemblies, and engineering-oriented design development.", "⌘"],
  ["03", "TENSILE STRUCTURES", "Exploration and design of tensile membrane forms, canopies, architectural structures, and supporting systems.", "⌁"],
  ["04", "FABRICATION & ANALYSIS", "Fabrication-oriented detailing and, where offered, engineering simulation or analysis to help evaluate design behaviour and support practical implementation.", "↗"]
];

const stages = [
  ["01", "DISCOVER", "Understand the brief, requirements, constraints, and intended outcome."],
  ["02", "CONCEPT", "Explore ideas, proportions, forms, and design directions."],
  ["03", "DESIGN & ANALYZE", "Develop CAD models, technical details, and appropriate engineering analyses when required."],
  ["04", "FABRICATE", "Prepare designs for practical production, materials, assembly, and fabrication."],
  ["05", "REALIZE", "Support the transition from digital design to a physical outcome, subject to the agreed project scope."]
];

const projectsNode = document.querySelector("#projects");

projects.forEach((project, index) => {
  const card = document.createElement("article");
  card.className = "project-card";
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `Open placeholder details for ${project.title}`);

  card.innerHTML = `
    <div class="project-photo">
      <img src="${project.image}" alt="${project.alt}" loading="${index === 0 ? "eager" : "lazy"}">
      <span class="project-tag">${project.number}</span>
      <span class="project-arrow" aria-hidden="true">↗</span>
    </div>
    <div class="project-meta">
      <div><h3>${project.title}</h3><p>${project.category}</p></div>
      <small>${project.tags}</small>
    </div>
  `;

  card.addEventListener("click", () => openProject(index));
  card.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject(index);
    }
  });

  projectsNode.append(card);
});

document.querySelector("#services").innerHTML = services.map(service => `
  <article class="service">
    <span class="service-number">${service[0]}</span>
    <div><h3>${service[1]}</h3><p>${service[2]}</p></div>
    <span class="service-icon" aria-hidden="true">${service[3]}</span>
  </article>
`).join("");

document.querySelector("#stages").innerHTML = stages.map(stage => `
  <article class="stage">
    <small>${stage[0]} / 05</small>
    <h3>${stage[1]}</h3>
    <p>${stage[2]}</p>
  </article>
`).join("");

const dialog = document.querySelector("#project-dialog");

function openProject(index) {
  const project = projects[index];
  document.querySelector("#dialog-label").textContent =
    `${project.number} / ${project.tags}`;
  document.querySelector("#dialog-title").textContent = project.title;
  document.querySelector("#dialog-description").textContent = project.description;
  document.querySelector(".dialog-image").style.backgroundImage =
    `url("${project.image}")`;
  dialog.showModal();
}

document.querySelector(".close").addEventListener("click", () => dialog.close());

dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

dialog.querySelector(".simple-link").addEventListener("click", () => dialog.close());

const toggle = document.querySelector(".toggle");
const nav = document.querySelector("#nav");

toggle.addEventListener("click", () => {
  const opened = toggle.getAttribute("aria-expanded") !== "true";
  toggle.setAttribute("aria-expanded", String(opened));
  toggle.setAttribute("aria-label", opened ? "Close navigation" : "Open navigation");
  nav.classList.toggle("open", opened);
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal, .stage").forEach(element => observer.observe(element));
}

document.querySelector("#year").textContent = new Date().getFullYear();

const emailLink = document.querySelector("#email-link");
if (CONFIG.email && !CONFIG.email.endsWith(".example")) {
  emailLink.href = `mailto:${CONFIG.email}`;
  emailLink.firstChild.textContent = `${CONFIG.email} ↗`;
}

document.querySelector("#social-link").addEventListener("click", event => {
  if (!CONFIG.instagram) {
    event.preventDefault();
  } else {
    event.currentTarget.href = CONFIG.instagram;
  }
});

const form = document.querySelector("#enquiry");
const status = document.querySelector("#status");

form.addEventListener("submit", async event => {
  event.preventDefault();

  if (!form.reportValidity()) return;

  const data = Object.fromEntries(new FormData(form));

  if (!CONFIG.formEndpoint) {
    if (CONFIG.email && !CONFIG.email.endsWith(".example")) {
      const subject = encodeURIComponent(`RACHIX project enquiry — ${data.type}`);
      const body = encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || "Not provided"}\nProject type: ${data.type}\n\n${data.message}`
      );

      window.location.href =
        `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;

      status.textContent =
        "Your email app should open with a draft. This page does not send the message directly.";
    } else {
      status.textContent =
        "Form validated, but no recipient/backend is configured. Set your email or form endpoint in script.js.";
    }
    return;
  }

  try {
    const response = await fetch(CONFIG.formEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error("Form submission failed");

    status.textContent = "Thanks — your enquiry has been submitted.";
    form.reset();
  } catch {
    status.textContent =
      "Couldn't submit. Check the configured endpoint or use email.";
  }
});
