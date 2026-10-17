const form = document.forms['registration'];

const rules = [
    { el: form.title, errId: "err_title", isValid: v => v !== "", msg: "กรุณาเลือกคำนำหน้า" },
    { el: form.fname, errId: "err_fname", isValid: v => v.length >= 2, msg: "กรุณากรอกชื่อ" },
    { el: form.lname, errId: "err_lname", isValid: v => v.length >= 2, msg: "กรุณากรอกนามสกุล" },
    { el: form.phone, errId: "err_phone", isValid: v => /^[0-9]{10}$/.test(v), msg: "กรุณากรอกเบอร์โทรศัพท์ 10 หลัก" },
    { el: form.email, errId: "err_email", isValid: v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v), msg: "รูปแบบอีเมลไม่ถูกต้อง (ตัวอย่าง: name@email.com)" },
    { el: form.address, errId: "err_address", isValid: v => v.length > 0, msg: "กรุณากรอกที่อยู่" },
    { el: form.education, errId: "err_education", isValid: v => v !== "", msg: "กรุณาเลือกระดับการศึกษา" },
    { el: form.position, errId: "err_position", isValid: v => v !== "", msg: "กรุณาเลือกตำแหน่งงาน" }
];


rules.forEach(({ el, errId, isValid, msg }) => {
    el.addEventListener("input", function () {
        if (isValid(el.value.trim())) {
            document.getElementById(errId).textContent = "";
            el.classList.remove("input-error");
        }
    });


    el.addEventListener("blur", function () {
        if (!isValid(el.value.trim())) {
            document.getElementById(errId).textContent = msg;
            el.classList.add("input-error");
        }
    });


    el.addEventListener("change", function () {
        if (isValid(el.value.trim())) {
            document.getElementById(errId).textContent = "";
            el.classList.remove("input-error");
        }
    });

});


document.querySelectorAll('input[name="aiTier"]').forEach(function (radio) {
    radio.addEventListener("change", function () {
        if (document.querySelector('input[name="aiTier"]:checked')) {
            document.getElementById("err_aiTier").textContent = "";
        }
    });
});


form.pdpa.addEventListener("change", function () {
    if (form.pdpa.checked) {
        document.getElementById("err_pdpa").textContent = "";
    }
});


function formValidation() {
    let formValid = true;
    let errors = [];

    document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
    document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));

    const showError = (element, errId, message) => {
        document.getElementById(errId).textContent = message;
        if (element) {
            element.classList.add("input-error");
        }
        errors.push(message);
        formValid = false;

    };

    rules.forEach(({ el, errId, isValid, msg }) => {
        if (!isValid(el.value.trim())) {
            showError(el, errId, msg);
        }
    });


    if (!document.querySelector('input[name="aiTier"]:checked')) {
        showError(
            null,
            "err_aiTier",
            "กรุณาเลือกระดับสมรรถนะ AI"
        );
    }


    if (!form.pdpa.checked) {
        showError(
            null,
            "err_pdpa",
            "กรุณายินยอมการประมวลผลข้อมูลส่วนบุคคล"
        );
    }


    if (!formValid) {
        const firstError = document.querySelector('.input-error');
        firstError?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
        firstError?.focus();

        let errorText = "ไม่สามารถส่งใบสมัครได้ เนื่องจาก:\n\n";
        errors.forEach(msg => {
            errorText += "- " + msg + "\n";
        });
        alert(errorText);
    } else {
        alert("ข้อมูลถูกต้อง สามารถส่งใบสมัครได้");
    }

    return formValid;
}