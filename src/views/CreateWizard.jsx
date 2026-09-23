'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, Building2, AlertCircle, Lightbulb, Monitor, Bot,
  ArrowRight, ArrowLeft, Check, Sparkles
} from 'lucide-react';
import { personaTypes, questionnaireSteps, getSchemaForStep } from '../data/personaData';
import { usePersona } from '../context/PersonaContext';
import './CreateWizard.css';

const IconMap = {
  User: <User size={32} />,
  Building2: <Building2 size={32} />,
  AlertCircle: <AlertCircle size={32} />,
  Lightbulb: <Lightbulb size={32} />,
  Monitor: <Monitor size={32} />,
  Bot: <Bot size={32} />
};

const CreateWizard = () => {
  const router = useRouter();
  const { addPersona } = usePersona();
  const [wizardState, setWizardState] = useState({
    globalStep: 0, // 0: Type, 1: Template, 2+: Questionnaire
    selectedType: null,
    selectedTemplate: null,
    questionnaireStep: 0,
    formData: {}
  });

  const handleInputChange = (fieldId, value) => {
    setWizardState(prev => ({
      ...prev,
      formData: { ...prev.formData, [fieldId]: value }
    }));
  };

  const handleTypeSelect = (type) => {
    setWizardState(prev => ({ ...prev, selectedType: type, globalStep: 1 }));
  };

  const handleTemplateSelect = (template) => {
    setWizardState(prev => ({ ...prev, selectedTemplate: template, globalStep: 2, questionnaireStep: 0 }));
  };

  const handleNextStep = () => {
    const isLastStep = wizardState.questionnaireStep === questionnaireSteps.length - 1;
    if (isLastStep) {
      // Save and Generate
      const personaToSave = {
        name: wizardState.formData.name || 'Untitled Persona',
        role: wizardState.formData.role || wizardState.selectedTemplate?.name || 'Persona',
        type: wizardState.selectedType?.title || 'Person',
        avatarColor: `hsl(${Math.random() * 360}, 70%, 50%)`, // Random avatar color
        description: wizardState.formData.description || 'Generated persona.',
        ...wizardState.formData, // capture all other dynamic fields
      };
      const newId = addPersona(personaToSave);
      router.push(`/persona/${newId}`);
    } else {
      setWizardState(prev => ({ ...prev, questionnaireStep: prev.questionnaireStep + 1 }));
    }
  };

  const handlePrevStep = () => {
    if (wizardState.questionnaireStep > 0) {
      setWizardState(prev => ({ ...prev, questionnaireStep: prev.questionnaireStep - 1 }));
    } else {
      setWizardState(prev => ({ ...prev, globalStep: 1 }));
    }
  };
  
  const handleBackToTypes = () => {
    setWizardState(prev => ({ ...prev, globalStep: 0, selectedType: null }));
  };

  const renderTypeSelection = () => (
    <div className="wizard-step-container">
      <div className="wizard-header text-center">
        <h1>What would you like to create?</h1>
        <p>Select the type of persona you want to build</p>
      </div>
      <div className="type-cards-grid">
        {personaTypes.map(type => (
          <div 
            key={type.id} 
            className="type-card"
            onClick={() => handleTypeSelect(type)}
          >
            <div className="type-icon">{IconMap[type.icon]}</div>
            <h3 className="type-title">{type.title}</h3>
            <p className="type-desc">{type.description}</p>
            <div className="type-footer">
              <span className="type-example">{type.example}</span>
              <span className="template-badge">{type.templatesCount} templates</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTemplateSelection = () => {
    if (!wizardState.selectedType) return null;
    return (
      <div className="wizard-step-container">
        <button className="back-btn" onClick={handleBackToTypes}>
          <ArrowLeft size={16} /> Back to Persona Types
        </button>
        <div className="wizard-header text-center mt-md">
          <h1>Choose a Template</h1>
          <p>Select a starting point for your {wizardState.selectedType.title} persona</p>
        </div>
        <div className="template-cards-grid">
          {wizardState.selectedType.templates.map((template, idx) => (
            <div 
              key={template.id} 
              className="template-card"
            >
              <div className="template-card-image">
                <img src="/assets/template-placeholder.jpg" alt={`${template.name} preview`} />
              </div>
              <div className="template-card-content">
                <div className="template-card-header">
                  <span className="template-number">Template {idx + 1}</span>
                  <span className={`complexity-badge ${template.complexity.toLowerCase()}`}>
                    {template.complexity}
                  </span>
                </div>
                <h3 className="template-title">{template.name}</h3>
                <div className="template-meta">
                  <span>{template.sections} sections</span>
                </div>
                <div className="template-actions">
                  <button className="preview-btn">Preview</button>
                  <button 
                    className="use-template-btn"
                    onClick={() => handleTemplateSelect(template)}
                  >
                    Use Template
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderQuestionnaire = () => {
    const currentStepName = questionnaireSteps[wizardState.questionnaireStep];
    const isLastStep = wizardState.questionnaireStep === questionnaireSteps.length - 1;

    return (
      <div className="wizard-step-container flex-row">
        <div className="questionnaire-sidebar">
          <div className="progress-list">
            {questionnaireSteps.map((step, idx) => (
              <div 
                key={step} 
                className={`progress-item ${idx === wizardState.questionnaireStep ? 'active' : ''} ${idx < wizardState.questionnaireStep ? 'completed' : ''}`}
              >
                <div className="step-indicator">
                  {idx < wizardState.questionnaireStep ? <Check size={12} /> : idx + 1}
                </div>
                <span className="step-name">{step}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="questionnaire-content">
          <div className="form-header">
            <h2>Step {wizardState.questionnaireStep + 1}: {currentStepName}</h2>
            <button className="ai-assist-btn">
              <Sparkles size={16} /> Auto-fill with AI
            </button>
          </div>
          
          <div className="form-body">
            {currentStepName === 'Review' ? (
              <div className="review-section">
                <h3>Review Your Persona</h3>
                <p>Ensure all details are correct before generating.</p>
                <div className="review-summary">
                  {Object.entries(wizardState.formData).map(([key, value]) => (
                    <div key={key} className="review-item">
                      <span className="review-label">{key}</span>
                      <span className="review-value">{value}</span>
                    </div>
                  ))}
                  {Object.keys(wizardState.formData).length === 0 && (
                    <p className="text-secondary">No data entered yet.</p>
                  )}
                </div>
              </div>
            ) : (
              getSchemaForStep(currentStepName).map((field) => (
                <div key={field.id} className="form-group">
                  <label>{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea 
                      placeholder={field.placeholder} 
                      className="form-textarea" 
                      rows={4}
                      value={wizardState.formData[field.id] || ''}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                    />
                  ) : (
                    <input 
                      type={field.type} 
                      placeholder={field.placeholder} 
                      className="form-input" 
                      value={wizardState.formData[field.id] || ''}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                    />
                  )}
                </div>
              ))
            )}
          </div>

          <div className="form-footer">
            <button className="secondary-btn" onClick={handlePrevStep}>
              Back
            </button>
            <div className="form-footer-right">
              <button className="text-btn">Save Draft</button>
              {isLastStep ? (
                <button className="primary-cta-btn generate-btn" onClick={handleNextStep}>
                  Generate Persona
                </button>
              ) : (
                <button className="primary-cta-btn" onClick={handleNextStep}>
                  Continue <ArrowRight size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="page-container wizard-page">
      {wizardState.globalStep === 0 && renderTypeSelection()}
      {wizardState.globalStep === 1 && renderTemplateSelection()}
      {wizardState.globalStep === 2 && renderQuestionnaire()}
    </div>
  );
};

export default CreateWizard;
