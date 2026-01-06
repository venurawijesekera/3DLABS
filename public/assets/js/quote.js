document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURATION CONSTANTS ---
    const API_BASE_URL = 'https://api.3dlabs.lk/slice';
    const MATERIAL_COSTS_PER_GRAM = {
        'PLA': 6.5,
        'PETG': 9,
        'PETG-CF': 24,
        'ABS': 11,
        'ASA': 15
    };
    const LABOR_COSTS_PER_HOUR = {
        'PLA': 180,
        'DEFAULT': 220 // For ABS, PETG, PETG-CF, ASA
    };
    const MARKUP_FACTOR = 2.6; // 160% markup
    const MINIMUM_SELLING_PRICE = 500;

    // --- DOM ELEMENT REFERENCES ---
    const materialSelect = document.getElementById('material');
    const infillSelect = document.getElementById('infill');
    const supportsCheckbox = document.getElementById('supports');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultsContainer = document.getElementById('results');
    const loadingIndicator = document.getElementById('loading');
    const errorContainer = document.getElementById('error');

    // --- RESULT DISPLAY ELEMENTS ---
    const res_material = document.getElementById('res-material');
    const res_infill = document.getElementById('res-infill');
    const res_supports = document.getElementById('res-supports');
    const res_time = document.getElementById('res-time');
    const res_filament = document.getElementById('res-filament');
    const res_material_cost = document.getElementById('res-material-cost');
    const res_labor_cost = document.getElementById('res-labor-cost');
    const res_total_cost = document.getElementById('res-total-cost');
    const res_selling_price = document.getElementById('res-selling-price');

    // --- EVENT LISTENER ---
    calculateBtn.addEventListener('click', handleCalculation);

    async function handleCalculation() {
        // 1. Get user inputs
        const selectedMaterial = materialSelect.value;
        const selectedInfill = infillSelect.value;
        const supportsEnabled = supportsCheckbox.checked;

        // 2. Prepare for API call
        setLoadingState(true);
        const supportsParam = supportsEnabled ? 'on' : 'off';
        const apiUrl = `${API_BASE_URL}?infill=${selectedInfill}&supports=${supportsParam}`;

        try {
            // 3. Call the API
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`API error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();

            // 4. Perform calculations
            const calculations = calculateAllCosts(data, selectedMaterial);

            // 5. Display the results
            displayResults(calculations, {
                material: selectedMaterial,
                infill: selectedInfill,
                supports: supportsEnabled
            });

        } catch (error) {
            console.error('Calculation failed:', error);
            displayError('Failed to fetch print data. Please try again later.');
        } finally {
            // 6. Reset UI state
            setLoadingState(false);
        }
    }

    function calculateAllCosts(apiData, material) {
        // API Data
        const timeSeconds = apiData.estimated_printing_time_seconds;
        const filamentGrams = apiData.total_filament_used_g;
        
        // Material Cost
        const materialCostPerGram = MATERIAL_COSTS_PER_GRAM[material];
        const materialCost = filamentGrams * materialCostPerGram;

        // Labor Cost
        const timeHours = timeSeconds / 3600;
        const laborCostPerHour = (material === 'PLA') ? LABOR_COSTS_PER_HOUR.PLA : LABOR_COSTS_PER_HOUR.DEFAULT;
        const laborCost = timeHours * laborCostPerHour;
        
        // Total Cost & Selling Price
        const totalCost = materialCost + laborCost;
        const rawSellingPrice = totalCost * MARKUP_FACTOR;
        const finalSellingPrice = Math.max(rawSellingPrice, MINIMUM_SELLING_PRICE);

        return {
            timeMinutes: Math.ceil(timeSeconds / 60),
            filamentGrams,
            materialCost,
            laborCost,
            totalCost,
            finalSellingPrice
        };
    }

    function displayResults(calcs, inputs) {
        resultsContainer.classList.remove('hidden');
        errorContainer.classList.add('hidden');

        // Format numbers for display
        const formatCurrency = (value) => `Rs. ${value.toFixed(2)}`;

        // Update UI elements
        res_material.textContent = inputs.material;
        res_infill.textContent = `${inputs.infill}%`;
        res_supports.textContent = inputs.supports ? 'ON' : 'OFF';
        res_time.textContent = `${calcs.timeMinutes} minutes`;
        res_filament.textContent = `${calcs.filamentGrams.toFixed(1)} g`;
        res_material_cost.textContent = formatCurrency(calcs.materialCost);
        res_labor_cost.textContent = formatCurrency(calcs.laborCost);
        res_total_cost.textContent = formatCurrency(calcs.totalCost);
        res_selling_price.textContent = formatCurrency(calcs.finalSellingPrice);
    }
    
    function displayError(message) {
        resultsContainer.classList.add('hidden');
        errorContainer.textContent = message;
        errorContainer.classList.remove('hidden');
    }

    function setLoadingState(isLoading) {
        if (isLoading) {
            calculateBtn.disabled = true;
            loadingIndicator.classList.remove('hidden');
            resultsContainer.classList.add('hidden');
            errorContainer.classList.add('hidden');
        } else {
            calculateBtn.disabled = false;
            loadingIndicator.classList.add('hidden');
        }
    }
});