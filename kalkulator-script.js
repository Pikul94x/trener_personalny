// Form step management
let currentStep = 1;
const totalSteps = 3;

// Navigation functions
function nextStep() {
    if (validateCurrentStep()) {
        if (currentStep < totalSteps) {
            document.querySelector(`[data-step="${currentStep}"]`).classList.remove('active');
            currentStep++;
            document.querySelector(`[data-step="${currentStep}"]`).classList.add('active');
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        document.querySelector(`[data-step="${currentStep}"]`).classList.remove('active');
        currentStep--;
        document.querySelector(`[data-step="${currentStep}"]`).classList.add('active');
    }
}

// Validation function
function validateCurrentStep() {
    const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
    const requiredInputs = currentStepElement.querySelectorAll('input[required]');
    let isValid = true;

    requiredInputs.forEach(input => {
        if (input.type === 'radio') {
            const radioGroup = currentStepElement.querySelectorAll(`input[name="${input.name}"]`);
            const isChecked = Array.from(radioGroup).some(radio => radio.checked);
            if (!isChecked) {
                isValid = false;
                showError(`Proszę wybrać ${input.name === 'gender' ? 'płeć' : input.name === 'activity' ? 'poziom aktywności' : 'cel'}`);
            }
        } else if (!input.value) {
            isValid = false;
            input.classList.add('error');
            showError('Proszę wypełnić wszystkie pola');
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// Show error message
function showError(message) {
    // Create a temporary error message
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 0, 0, 0.9);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);

    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// Calculator form submission
document.getElementById('calculatorForm').addEventListener('submit', function(e) {
    e.preventDefault();

    if (!validateCurrentStep()) {
        return;
    }

    // Get form values
    const formData = new FormData(this);
    const data = {
        gender: formData.get('gender'),
        age: parseInt(formData.get('age')),
        weight: parseFloat(formData.get('weight')),
        height: parseInt(formData.get('height')),
        activity: parseFloat(formData.get('activity')),
        goal: formData.get('goal')
    };

    // Calculate BMR using Mifflin-St Jeor equation
    let bmr;
    if (data.gender === 'male') {
        bmr = (10 * data.weight) + (6.25 * data.height) - (5 * data.age) + 5;
    } else {
        bmr = (10 * data.weight) + (6.25 * data.height) - (5 * data.age) - 161;
    }

    // Calculate TDEE (Total Daily Energy Expenditure)
    const tdee = bmr * data.activity;

    // Calculate daily calories based on goal
    let dailyCalories = tdee;
    switch(data.goal) {
        case 'lose-fast':
            dailyCalories = tdee - 500;
            break;
        case 'lose-slow':
            dailyCalories = tdee - 250;
            break;
        case 'maintain':
            dailyCalories = tdee;
            break;
        case 'gain-slow':
            dailyCalories = tdee + 250;
            break;
        case 'gain-fast':
            dailyCalories = tdee + 500;
            break;
    }

    // Calculate macronutrients
    // Protein: 2g per kg of body weight
    const protein = Math.round(data.weight * 2);
    const proteinCalories = protein * 4; // 4 kcal per gram of protein

    // Fats: 30% of total calories
    const fatsCalories = dailyCalories * 0.30;
    const fats = Math.round(fatsCalories / 9); // 9 kcal per gram of fat

    // Carbs: remaining calories
    const carbsCalories = dailyCalories - proteinCalories - fatsCalories;
    const carbs = Math.round(carbsCalories / 4); // 4 kcal per gram of carbs

    // Display results
    displayResults({
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        dailyCalories: Math.round(dailyCalories),
        protein: protein,
        carbs: carbs,
        fats: fats
    });
});

// Display results with animation
function displayResults(results) {
    // Hide form and show results
    document.getElementById('calculatorForm').style.display = 'none';
    document.getElementById('results').style.display = 'block';

    // Animate numbers
    animateValue('bmr', 0, results.bmr, 1000);
    animateValue('tdee', 0, results.tdee, 1000);
    animateValue('dailyCalories', 0, results.dailyCalories, 1000);
    animateValue('protein', 0, results.protein, 1000);
    animateValue('carbs', 0, results.carbs, 1000);
    animateValue('fats', 0, results.fats, 1000);

    // Scroll to results
    document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Animate counting numbers
function animateValue(id, start, end, duration) {
    const element = document.getElementById(id);
    const range = end - start;
    const increment = range / (duration / 16); // 60 FPS
    let current = start;

    const timer = setInterval(function() {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = end;
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, 16);
}

// Reset calculator
function resetCalculator() {
    // Reset form
    document.getElementById('calculatorForm').reset();

    // Reset step
    document.querySelector(`[data-step="${currentStep}"]`).classList.remove('active');
    currentStep = 1;
    document.querySelector(`[data-step="${currentStep}"]`).classList.add('active');

    // Show form and hide results
    document.getElementById('calculatorForm').style.display = 'block';
    document.getElementById('results').style.display = 'none';

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Loading screen
window.addEventListener('load', function() {
    setTimeout(function() {
        const loader = document.getElementById('loader');
        loader.classList.add('fade-out');
        setTimeout(function() {
            loader.style.display = 'none';
        }, 500);
    }, 500);
});

// Add input validation
document.addEventListener('DOMContentLoaded', function() {
    // Age validation - only on blur to avoid interrupting typing
    const ageInput = document.getElementById('age');
    if (ageInput) {
        ageInput.addEventListener('blur', function() {
            if (this.value && this.value < 15) this.value = 15;
            if (this.value && this.value > 100) this.value = 100;
        });
    }

    // Weight validation - only on blur to avoid interrupting typing
    const weightInput = document.getElementById('weight');
    if (weightInput) {
        weightInput.addEventListener('blur', function() {
            if (this.value && this.value < 30) this.value = 30;
            if (this.value && this.value > 300) this.value = 300;
        });
    }

    // Height validation - only on blur to avoid interrupting typing
    const heightInput = document.getElementById('height');
    if (heightInput) {
        heightInput.addEventListener('blur', function() {
            if (this.value && this.value < 100) this.value = 100;
            if (this.value && this.value > 250) this.value = 250;
        });
    }

    // Prevent scroll wheel from changing number inputs
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('wheel', function(e) {
            e.preventDefault();
        });

        // Prevent up/down arrow keys from changing values
        input.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                e.preventDefault();
            }
        });
    });

    // Add hover effects to cards on desktop
    if (window.innerWidth > 1024) {
        const cards = document.querySelectorAll('.activity-card, .goal-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
});