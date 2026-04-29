/**
 * HVAC Duct Calculator – Logic & Interactions
 * Premium Silver & Wood Edition
 */

document.addEventListener('DOMContentLoaded', () => {
  // =====================
  // Background Particles
  // =====================
  const particlesContainer = document.getElementById('bgParticles');
  function createParticles() {
    if (!particlesContainer) return;
    const count = window.innerWidth < 640 ? 6 : 12;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      const size = Math.random() * 4 + 2;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDuration = (Math.random() * 15 + 15) + 's';
      p.style.animationDelay = (Math.random() * 10) + 's';
      particlesContainer.appendChild(p);
    }
  }
  createParticles();

  // =====================
  // State
  // =====================
  let ductType = 'metal';
  let sizeBy = 'friction_rate';
  let enterEither = 'ductSize';
  let ductShape = 'round';

  // =====================
  // DOM Elements
  // =====================
  const form = document.getElementById('mainCalculatorForm');
  const resultsContainer = document.getElementById('resultsContainer');
  const resultsGrid = document.getElementById('resultsGrid');

  // Toggle buttons
  const toggleBtns = document.querySelectorAll('#ductTypeToggle .toggle-btn');

  // Selects
  const sizeBySelect = document.getElementById('sizeBy');
  const enterEitherSelect = document.getElementById('ductSizeOrCfm');
  const shapeSelect = document.getElementById('shape');

  // Inputs
  const frictionRateInput = document.getElementById('frictionRate');
  const bends45 = document.getElementById('bends45');
  const bends90 = document.getElementById('bends90');
  const bends180 = document.getElementById('bends180');
  const ductLengthInput = document.getElementById('ductLength');
  const diameterInput = document.getElementById('diameter');
  const rectWidthInput = document.getElementById('rectWidth');
  const rectHeightInput = document.getElementById('rectHeight');
  const cfmInput = document.getElementById('cfm');

  // Dimension containers
  const roundDimensions = document.getElementById('roundDimensions');
  const rectDimensions = document.getElementById('rectDimensions');
  const cfmContainer = document.getElementById('cfmContainer');

  // Labels
  const frictionRateLabel = document.getElementById('frictionRateLabel');
  const frictionRateUnit = document.getElementById('frictionRateUnit');
  const frictionRateSection = document.getElementById('section-frictionRate');

  // Modal
  const frictionRateModal = document.getElementById('frictionRateModal');
  const closeModalBtn = document.getElementById('closeModal');
  const viewCommonRatesLink = document.getElementById('viewCommonRates');

  // =====================
  // Duct Type Toggle
  // =====================
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      ductType = btn.dataset.value;
      hideResults();
    });
  });

  // =====================
  // Size By Change
  // =====================
  sizeBySelect.addEventListener('change', (e) => {
    sizeBy = e.target.value;
    if (sizeBy === 'velocity') {
      frictionRateLabel.innerHTML = 'Velocity <a href="#friction-rate-info" class="info-link" id="viewCommonRates">View Common Rates</a>';
      frictionRateUnit.textContent = 'ft/min (FPM)';
      frictionRateInput.placeholder = '900';
      rebindCommonRates();
    } else {
      frictionRateLabel.innerHTML = 'Friction Loss Rate <a href="#friction-rate-info" class="info-link" id="viewCommonRates">View Common Rates</a>';
      frictionRateUnit.textContent = 'per 100 ft (in/wg)';
      frictionRateInput.placeholder = '0.08';
      rebindCommonRates();
    }
    hideResults();
  });

  // =====================
  // Enter Either Change
  // =====================
  enterEitherSelect.addEventListener('change', (e) => {
    enterEither = e.target.value;
    updateDimensionVisibility();
    hideResults();
  });

  // =====================
  // Shape Change
  // =====================
  shapeSelect.addEventListener('change', (e) => {
    ductShape = e.target.value;
    updateDimensionVisibility();
    hideResults();
  });

  function updateDimensionVisibility() {
    if (enterEither === 'cfm') {
      // Show CFM input, hide duct size inputs
      roundDimensions.classList.add('hidden');
      rectDimensions.classList.add('hidden');
      cfmContainer.classList.remove('hidden');
      // Also hide shape select since it's not needed for CFM mode
    } else {
      cfmContainer.classList.add('hidden');
      if (ductShape === 'round') {
        roundDimensions.classList.remove('hidden');
        rectDimensions.classList.add('hidden');
      } else {
        roundDimensions.classList.add('hidden');
        rectDimensions.classList.remove('hidden');
      }
    }
  }

  // =====================
  // Modal
  // =====================
  function rebindCommonRates() {
    const link = document.getElementById('viewCommonRates');
    if (link) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        frictionRateModal.classList.remove('hidden');
      });
    }
  }

  viewCommonRatesLink.addEventListener('click', (e) => {
    e.preventDefault();
    frictionRateModal.classList.remove('hidden');
  });

  closeModalBtn.addEventListener('click', () => {
    frictionRateModal.classList.add('hidden');
  });

  frictionRateModal.addEventListener('click', (e) => {
    if (e.target === frictionRateModal) {
      frictionRateModal.classList.add('hidden');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!frictionRateModal.classList.contains('hidden')) frictionRateModal.classList.add('hidden');
      if (!embedModal.classList.contains('hidden')) embedModal.classList.add('hidden');
    }
  });

  // =====================
  // Embed Modal
  // =====================
  const embedModal = document.getElementById('embedModal');
  const embedToolBtn = document.getElementById('embedToolBtn');
  const closeEmbedModal = document.getElementById('closeEmbedModal');
  const copyEmbedBtn = document.getElementById('copyEmbedBtn');
  const embedCode = document.getElementById('embedCode');

  if (embedToolBtn && embedModal) {
    embedToolBtn.addEventListener('click', (e) => {
      e.preventDefault();
      embedModal.classList.remove('hidden');
    });

    closeEmbedModal.addEventListener('click', () => {
      embedModal.classList.add('hidden');
    });

    embedModal.addEventListener('click', (e) => {
      if (e.target === embedModal) embedModal.classList.add('hidden');
    });

    if (copyEmbedBtn && embedCode) {
      copyEmbedBtn.addEventListener('click', () => {
        embedCode.select();
        document.execCommand('copy');
        const originalText = copyEmbedBtn.textContent;
        copyEmbedBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyEmbedBtn.textContent = originalText;
        }, 2000);
      });
    }
  }

  // =====================
  // Uncommon Value Warning
  // =====================
  const uncommonWarning = document.getElementById('uncommonWarning');
  frictionRateInput.addEventListener('input', () => {
    if (sizeBy === 'friction_rate') {
      const val = parseFloat(frictionRateInput.value);
      // Warning if < 0.05 or > 0.5 which are outside typical residential/light-commercial bounds
      if (!isNaN(val) && (val < 0.05 || val > 0.5)) {
        uncommonWarning.classList.remove('hidden');
      } else {
        uncommonWarning.classList.add('hidden');
      }
    } else {
      uncommonWarning.classList.add('hidden');
    }
  });

  // =====================
  // Convert Here Link
  // =====================
  document.getElementById('convertHere').addEventListener('click', (e) => {
    e.preventDefault();
    const accordion = document.getElementById('accordion-rectToRound');
    const header = accordion.querySelector('.accordion-header');
    const panel = accordion.querySelector('.accordion-panel');
    if (!panel.classList.contains('open')) {
      header.setAttribute('aria-expanded', 'true');
      panel.classList.add('open');
    }
    accordion.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // =====================
  // Accordion
  // =====================
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const expanded = header.getAttribute('aria-expanded') === 'true';
      header.setAttribute('aria-expanded', !expanded);
      const panel = document.getElementById(header.getAttribute('aria-controls'));
      panel.classList.toggle('open');
    });
  });

  // =====================
  // Main Calculation
  // =====================
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    const frictionRate = parseFloat(frictionRateInput.value);
    const length = parseFloat(ductLengthInput.value);
    const b45 = parseInt(bends45.value) || 0;
    const b90 = parseInt(bends90.value) || 0;
    const b180 = parseInt(bends180.value) || 0;

    // Validation
    let hasError = false;

    if (isNaN(frictionRate) || frictionRate <= 0) {
      frictionRateInput.classList.add('error');
      hasError = true;
    }

    if (isNaN(length) || length <= 0) {
      ductLengthInput.classList.add('error');
      hasError = true;
    }

    if (enterEither === 'ductSize') {
      if (ductShape === 'round') {
        const dia = parseFloat(diameterInput.value);
        if (isNaN(dia) || dia <= 0) {
          diameterInput.classList.add('error');
          hasError = true;
        }
      } else {
        const w = parseFloat(rectWidthInput.value);
        const h = parseFloat(rectHeightInput.value);
        if (isNaN(w) || w <= 0) { rectWidthInput.classList.add('error'); hasError = true; }
        if (isNaN(h) || h <= 0) { rectHeightInput.classList.add('error'); hasError = true; }
      }
    } else {
      const cfmVal = parseFloat(cfmInput.value);
      if (isNaN(cfmVal) || cfmVal <= 0) {
        cfmInput.classList.add('error');
        hasError = true;
      }
    }

    if (hasError) return;

    // Equivalent length adjustments for bends (in feet)
    let bendMultiplier = 1.0;
    if (ductType === 'flex') {
      bendMultiplier = 1.5; // flex has more resistance
    }

    const bend45Equiv = b45 * 5 * bendMultiplier;
    const bend90Equiv = b90 * 10 * bendMultiplier;
    const bend180Equiv = b180 * 20 * bendMultiplier;
    const totalEquivLength = length + bend45Equiv + bend90Equiv + bend180Equiv;

    let results = {};

    if (enterEither === 'ductSize') {
      // Calculate CFM from duct size
      let effectiveDiameter;
      if (ductShape === 'round') {
        effectiveDiameter = parseFloat(diameterInput.value);
      } else {
        const w = parseFloat(rectWidthInput.value);
        const h = parseFloat(rectHeightInput.value);
        // Rectangular to round equivalent: De = 1.3 * (a*b)^0.625 / (a+b)^0.25
        effectiveDiameter = 1.3 * Math.pow(w * h, 0.625) / Math.pow(w + h, 0.25);
      }

      const areaFt2 = Math.PI * Math.pow(effectiveDiameter / 12 / 2, 2);

      if (sizeBy === 'friction_rate') {
        // Calculate Q (CFM) from diameter and friction rate using ASHRAE formula:
        // H_f = 0.109136 * Q^1.9 / D^5.02  =>  Q = (H_f / 0.109136 * D^5.02)^(1/1.9)
        let effectiveFriction = frictionRate;
        if (ductType === 'flex') {
          effectiveFriction = frictionRate / 1.5; // Flex has roughly 50% more resistance
        }
        
        const cfmCalc = Math.pow((effectiveFriction / 0.109136) * Math.pow(effectiveDiameter, 5.02), 1 / 1.9);
        const velocityFPM = cfmCalc / areaFt2;
        const totalPressureLoss = (frictionRate / 100) * totalEquivLength;
        
        results = {
          'CFM': { value: cfmCalc.toFixed(0), unit: 'cubic ft/min' },
          'Velocity': { value: velocityFPM.toFixed(0), unit: 'ft/min' },
          'Equiv. Length': { value: totalEquivLength.toFixed(1), unit: 'feet' },
          'Total Loss': { value: totalPressureLoss.toFixed(4), unit: 'in/wg' },
          'Eff. Diameter': { value: effectiveDiameter.toFixed(1), unit: 'inches' },
          'Duct Area': { value: (areaFt2 * 144).toFixed(1), unit: 'sq. inches' }
        };
      } else {
        // Velocity sizing
        const velocity = frictionRate; // User entered velocity in FPM
        const cfmCalc = areaFt2 * velocity;
        
        // Estimate friction from velocity and diameter
        let frictionEst = 0.109136 * Math.pow(cfmCalc, 1.9) / Math.pow(effectiveDiameter, 5.02);
        if (ductType === 'flex') {
          frictionEst *= 1.5; // Flex has higher friction
        }
        const totalPressureLoss = (frictionEst / 100) * totalEquivLength;

        results = {
          'CFM': { value: cfmCalc.toFixed(0), unit: 'cubic ft/min' },
          'Velocity': { value: velocity.toFixed(0), unit: 'ft/min' },
          'Equiv. Length': { value: totalEquivLength.toFixed(1), unit: 'feet' },
          'Est. Friction': { value: frictionEst.toFixed(4), unit: 'in/wg per 100ft' },
          'Total Loss': { value: totalPressureLoss.toFixed(4), unit: 'in/wg' },
          'Eff. Diameter': { value: effectiveDiameter.toFixed(1), unit: 'inches' }
        };
      }
    } else {
      // Calculate duct size from CFM
      const cfmVal = parseFloat(cfmInput.value);

      if (sizeBy === 'friction_rate') {
        // Calculate required diameter from CFM and friction rate
        // D = (0.109136 * Q^1.9 / H_f)^(1/5.02)
        let effectiveFriction = frictionRate;
        if (ductType === 'flex') {
          effectiveFriction = frictionRate / 1.5;
        }
        
        const diamCalc = Math.pow((0.109136 * Math.pow(cfmVal, 1.9)) / effectiveFriction, 1 / 5.02);
        const areaFt2 = Math.PI * Math.pow(diamCalc / 12 / 2, 2);
        const velocityFPM = cfmVal / areaFt2;
        const totalPressureLoss = (frictionRate / 100) * totalEquivLength;

        results = {
          'Req. Diameter': { value: diamCalc.toFixed(1), unit: 'inches' },
          'Velocity': { value: velocityFPM.toFixed(0), unit: 'ft/min' },
          'Equiv. Length': { value: totalEquivLength.toFixed(1), unit: 'feet' },
          'Total Loss': { value: totalPressureLoss.toFixed(4), unit: 'in/wg' },
          'Duct Area': { value: (areaFt2 * 144).toFixed(1), unit: 'sq. inches' }
        };
      } else {
        // Calculate duct size from CFM and Velocity
        const velocity = frictionRate; // velocity in FPM
        const areaFt2 = cfmVal / velocity;
        const diamCalc = Math.sqrt(areaFt2 * 4 / Math.PI) * 12;
        
        let frictionEst = 0.109136 * Math.pow(cfmVal, 1.9) / Math.pow(diamCalc, 5.02);
        if (ductType === 'flex') {
          frictionEst *= 1.5;
        }
        const totalPressureLoss = (frictionEst / 100) * totalEquivLength;

        results = {
          'Req. Diameter': { value: diamCalc.toFixed(1), unit: 'inches' },
          'Velocity': { value: velocity.toFixed(0), unit: 'ft/min' },
          'Equiv. Length': { value: totalEquivLength.toFixed(1), unit: 'feet' },
          'Duct Area': { value: (areaFt2 * 144).toFixed(1), unit: 'sq. inches' },
          'Total Loss': { value: totalPressureLoss.toFixed(4), unit: 'in/wg' }
        };
      }
    }

    displayResults(results);
  });

  function displayResults(results) {
    resultsGrid.innerHTML = '';
    let delay = 0;
    
    // Check for warnings
    const velocity = parseFloat(results['Velocity']?.value);
    let warningHtml = '';
    if (velocity > 900) {
      warningHtml = `
        <div class="col-span-full mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-700 text-xs flex items-start gap-2 animate-fade-in">
          <svg class="mt-0.5 shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <div>
            <strong>High Velocity Warning:</strong> ${velocity.toFixed(0)} FPM exceeds recommended residential limits (typically 600-900 FPM). This may cause excessive noise and pressure drop.
          </div>
        </div>
      `;
    }

    for (const [label, data] of Object.entries(results)) {
      const card = document.createElement('div');
      card.className = 'result-card';
      card.style.setProperty('--delay', delay + 's');
      card.innerHTML = `
        <div class="result-card-label">${label}</div>
        <div class="result-card-value">${data.value}</div>
        <div class="result-card-unit">${data.unit}</div>
      `;
      resultsGrid.appendChild(card);
      delay += 0.07;
    }

    if (warningHtml) {
      const div = document.createElement('div');
      div.className = 'col-span-full';
      div.innerHTML = warningHtml;
      resultsGrid.appendChild(div);
    }

    // Add action buttons
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'col-span-full mt-6 flex flex-wrap justify-center gap-3';
    actionsDiv.innerHTML = `
      <button type="button" id="copyResultsBtn" class="flex items-center gap-1.5 px-4 py-2 bg-silver-100 hover:bg-silver-200 text-silver-700 text-xs font-bold rounded-full transition-all">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        Copy Results
      </button>
      <button type="button" id="printResultsBtn" class="flex items-center gap-1.5 px-4 py-2 bg-silver-100 hover:bg-silver-200 text-silver-700 text-xs font-bold rounded-full transition-all">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
        Print
      </button>
    `;
    resultsGrid.appendChild(actionsDiv);

    document.getElementById('copyResultsBtn').addEventListener('click', () => copyResults(results));
    document.getElementById('printResultsBtn').addEventListener('click', () => window.print());

    resultsContainer.classList.remove('hidden');
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function copyResults(results) {
    let text = "HVAC Duct Calculation Results:\n\n";
    for (const [label, data] of Object.entries(results)) {
      text += `${label}: ${data.value} ${data.unit}\n`;
    }
    text += "\nCalculated at: https://www.hvacductcalculator.com";
    
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById('copyResultsBtn');
      const originalText = btn.innerHTML;
      btn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        Copied!
      `;
      setTimeout(() => { btn.innerHTML = originalText; }, 2000);
    });
  }

  function hideResults() {
    resultsContainer.classList.add('hidden');
  }

  function clearErrors() {
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
  }

  // =====================
  // Utility: Rect to Round
  // =====================
  document.getElementById('rectToRoundForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const s1 = parseFloat(document.getElementById('rectSide1').value);
    const s2 = parseFloat(document.getElementById('rectSide2').value);

    if (isNaN(s1) || s1 <= 0 || isNaN(s2) || s2 <= 0) return;

    // De = 1.3 * (a*b)^0.625 / (a+b)^0.25
    const De = 1.3 * Math.pow(s1 * s2, 0.625) / Math.pow(s1 + s2, 0.25);
    document.getElementById('resultRectToRoundValue').textContent = De.toFixed(2) + ' inches';
    document.getElementById('resultRectToRound').classList.remove('hidden');
  });

  // =====================
  // Utility: Diameter to Rect
  // =====================
  document.getElementById('diaToRectForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const dia = parseFloat(document.getElementById('diaInput').value);
    const side1 = parseFloat(document.getElementById('diaSide1').value);

    if (isNaN(dia) || dia <= 0 || isNaN(side1) || side1 <= 0) return;

    // From De = 1.3 * (a*b)^0.625 / (a+b)^0.25, solve for b given De and a
    // Iterative approach
    let side2 = dia; // initial guess
    for (let i = 0; i < 50; i++) {
      const De = 1.3 * Math.pow(side1 * side2, 0.625) / Math.pow(side1 + side2, 0.25);
      const error = De - dia;
      if (Math.abs(error) < 0.01) break;
      // Adjust side2
      side2 = side2 - error * 0.8;
      if (side2 < 1) side2 = 1;
    }

    document.getElementById('resultDiaToRectValue').textContent = side2.toFixed(2) + ' inches';
    document.getElementById('resultDiaToRect').classList.remove('hidden');
  });

  // =====================
  // Input formatting – numbers only
  // =====================
  document.querySelectorAll('input[inputmode="numeric"]').forEach(input => {
    input.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
  });

  document.querySelectorAll('input[inputmode="decimal"]').forEach(input => {
    input.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9.]/g, '');
      // Only allow one dot
      const parts = e.target.value.split('.');
      if (parts.length > 2) {
        e.target.value = parts[0] + '.' + parts.slice(1).join('');
      }
    });
  });

  // =====================
  // Initial state
  // =====================
  updateDimensionVisibility();
});
