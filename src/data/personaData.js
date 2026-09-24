export const personaTypes = [
  {
    id: 'person',
    title: 'Person',
    description: 'Create customer, user, buyer, employee, or audience personas.',
    icon: 'User',
    example: 'e.g. "Arjun - SaaS Product Manager"',
    templatesCount: 5,
    templates: [
      { id: 't1', name: 'Customer Profile', complexity: 'Low', sections: 5 },
      { id: 't2', name: 'UX Research Persona', complexity: 'High', sections: 8 },
      { id: 't3', name: 'Buyer Persona', complexity: 'Medium', sections: 6 },
      { id: 't4', name: 'Marketing Persona', complexity: 'Medium', sections: 7 },
      { id: 't5', name: 'Product User Persona', complexity: 'High', sections: 9 }
    ]
  },
  {
    id: 'company',
    title: 'Company / Business',
    description: 'Create organizational and business personas.',
    icon: 'Building2',
    example: 'e.g. "Acme Corp - Mid-market SaaS"',
    templatesCount: 5,
    templates: [
      { id: 't6', name: 'Business Profile', complexity: 'Medium', sections: 6 },
      { id: 't7', name: 'B2B ICP', complexity: 'High', sections: 8 },
      { id: 't8', name: 'Enterprise Account', complexity: 'High', sections: 10 },
      { id: 't9', name: 'Startup Profile', complexity: 'Low', sections: 5 },
      { id: 't10', name: 'Competitive Business Profile', complexity: 'Medium', sections: 7 }
    ]
  },
  {
    id: 'problem',
    title: 'Problem',
    description: 'Understand a specific problem, pain point, or opportunity.',
    icon: 'AlertCircle',
    example: 'e.g. "High Customer Churn"',
    templatesCount: 5,
    templates: [
      { id: 't11', name: 'Problem Discovery', complexity: 'Low', sections: 4 },
      { id: 't12', name: 'Customer Pain Point', complexity: 'Medium', sections: 6 },
      { id: 't13', name: 'Root Cause Analysis', complexity: 'High', sections: 8 },
      { id: 't14', name: 'Market Problem', complexity: 'Medium', sections: 6 },
      { id: 't15', name: 'Problem-Solution Fit', complexity: 'High', sections: 7 }
    ]
  },
  {
    id: 'solution',
    title: 'Solution',
    description: 'Define a solution persona around a product or service.',
    icon: 'Lightbulb',
    example: 'e.g. "Automated Invoicing Feature"',
    templatesCount: 5,
    templates: [
      { id: 't16', name: 'Solution Overview', complexity: 'Low', sections: 4 },
      { id: 't17', name: 'Value Proposition Canvas', complexity: 'Medium', sections: 5 },
      { id: 't18', name: 'Product Feature', complexity: 'Medium', sections: 6 },
      { id: 't19', name: 'Service Offering', complexity: 'High', sections: 7 },
      { id: 't20', name: 'Proposed Solution', complexity: 'High', sections: 8 }
    ]
  },
  {
    id: 'software',
    title: 'Software / App',
    description: 'Create personas for software products, applications or digital platforms.',
    icon: 'Monitor',
    example: 'e.g. "Analytics Dashboard App"',
    templatesCount: 5,
    templates: [
      { id: 't21', name: 'SaaS User', complexity: 'Medium', sections: 6 },
      { id: 't22', name: 'Developer User', complexity: 'High', sections: 8 },
      { id: 't23', name: 'Enterprise Software', complexity: 'High', sections: 9 },
      { id: 't24', name: 'Mobile App User', complexity: 'Medium', sections: 5 },
      { id: 't25', name: 'Product UX Persona', complexity: 'High', sections: 8 }
    ]
  },
  {
    id: 'ai',
    title: 'AI Persona',
    description: 'Define behavior, personality, role, and capabilities for an AI persona.',
    icon: 'Bot',
    example: 'e.g. "Customer Support Agent"',
    templatesCount: 5,
    templates: [
      { id: 't26', name: 'Support Chatbot', complexity: 'Medium', sections: 6 },
      { id: 't27', name: 'Sales Assistant AI', complexity: 'High', sections: 8 },
      { id: 't28', name: 'Creative Writing AI', complexity: 'Low', sections: 4 },
      { id: 't29', name: 'Coding Assistant AI', complexity: 'High', sections: 9 },
      { id: 't30', name: 'General Assistant AI', complexity: 'Medium', sections: 6 }
    ]
  }
];

// Realistic section definitions used to render meaningful template previews.
export const templateSectionLibrary = [
  { title: 'Overview', description: 'High-level summary of who this persona represents and why they matter.' },
  { title: 'Demographics', description: 'Age, location, education, income, and personal background.' },
  { title: 'Goals & Motivations', description: 'What this persona is ultimately trying to achieve and why.' },
  { title: 'Pain Points', description: 'The frustrations, blockers, and challenges they face today.' },
  { title: 'Behaviors', description: 'Daily habits, preferences, and patterns of interaction.' },
  { title: 'Preferred Channels', description: 'Where they spend time and how they prefer to engage.' },
  { title: 'Decision Drivers', description: 'The factors and people that influence their decisions.' },
  { title: 'Key Metrics', description: 'How success and satisfaction are measured for this persona.' },
  { title: 'Representative Quotes', description: 'Direct statements that capture their mindset.' },
  { title: 'Recommendations', description: 'Actionable next steps and messaging guidance.' }
];

export const getTemplateSections = (template) =>
  templateSectionLibrary.slice(0, Math.max(template.sections, 1));

export const questionnaireSteps = [
  'Basic Information',
  'Background',
  'Goals',
  'Problems',
  'Review'
];

export const getSchemaForStep = (stepName) => {
  switch (stepName) {
    case 'Basic Information':
      return [
        { id: 'name', label: 'Persona Name', type: 'text', placeholder: 'e.g. Alex Smith' },
        { id: 'role', label: 'Role / Job Title', type: 'text', placeholder: 'e.g. Marketing Manager' },
        { id: 'description', label: 'Short Description', type: 'textarea', placeholder: 'Brief summary...' }
      ];
    case 'Background':
      return [
        { id: 'age', label: 'Age Range', type: 'text', placeholder: 'e.g. 25-34' },
        { id: 'location', label: 'Location', type: 'text', placeholder: 'e.g. New York, USA' },
        { id: 'education', label: 'Education', type: 'text', placeholder: 'e.g. Bachelor in Business' }
      ];
    case 'Goals':
      return [
        { id: 'primaryGoal', label: 'Primary Goal', type: 'text', placeholder: 'What do they want to achieve?' },
        { id: 'secondaryGoals', label: 'Secondary Goals', type: 'textarea', placeholder: 'Any other goals...' }
      ];
    case 'Problems':
      return [
        { id: 'painPoints', label: 'Pain Points', type: 'textarea', placeholder: 'What frustrates them?' },
        { id: 'challenges', label: 'Main Challenges', type: 'textarea', placeholder: 'What blocks their success?' }
      ];
    default:
      return [];
  }
};
