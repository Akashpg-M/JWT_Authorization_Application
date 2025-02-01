import { Check, X } from 'lucide-react';

const PasswordCriteria = ({password}) => {
  const criteria = [
    {label: "At least 6 charecters", met: password.length >= 6},
    {label: "Contains uppercase letter", met: /[A-Z]/.test(password)},
    {label: "Contains lowercase letter", met: /[a-z]/.test(password)},
    {label: "Contains a number", met: /\d/.test(password)},
    {label: "Contains special charecters", met: /[A-Za-z0-9]/.test(password)},
  ];

  return (
    <div>
      {criteria.map((item) => (
        <div key={item.label}>
          {item.met ? (
            <Check/>
          ) : (
            <X />
          )}
          <span className={item.met ? "text-green-500" : "tet-grey-400"}>{item.label}</span>
        </div>

      ))}
    </div>
  )
}

const PasswordStrengthMeter = ({password}) => {
  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if(pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
    if(pass.match(/\d/)) strength++;
    if(pass.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  }

  const strength = getStrength(password);

  const getcolor = (strength) => {
    if(strength === 0) return "bg-red-500";
    if(strength === 1) return "bg-red-400";
    if(strength === 2) return "bg-yellow-500";
    if(strength === 3) return "bg-yellow-400";
    return "bg-green-500";
  }
  const getStrengthText = (strength) => {
    if(strength === 0) return "very Weak";
    if(strength === 1) return "Weak";
    if(strength === 2) return "fair";
    if(strength === 3) return "Good";
    return "Strong";
  }

  return(
    <div>
      <div>
        <span>Password Strength</span>
        <span>{getStrengthText(strength)}</span>
      </div>

      <div>
        {[...Array(4)].map((_, index) => (
          <div
            key = {index}
            className = {`${index < strength ? getcolor(strength) : "bg-gray-600"}`}
          />
        ))}
      </div>
      <PasswordCriteria password={password} />
    </div> 
  ) 
};

export default PasswordStrengthMeter;