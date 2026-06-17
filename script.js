// ─── Radio "Outro" Social: habilita o input ───
const radioOutro = document.getElementById('radio-outro');
const inputOutro = document.getElementById('input-outro');
const radiosEvento = document.querySelectorAll('input[name="social-evento"]');

radiosEvento.forEach(function(radio) {
    radio.addEventListener('change', function() {
        if (radioOutro.checked) {
            inputOutro.disabled = false;
            inputOutro.focus();
        } else {
            inputOutro.disabled = true;
            inputOutro.value = '';
            limparErro('input-outro');
        }
    });
});

// ─── Radio "Outro" Corporativo: habilita o input ───
const corpRadioOutro = document.getElementById('corp-radio-outro');
const corpInputOutro = document.getElementById('corp-input-outro');
const radiosCorpEvento = document.querySelectorAll('input[name="corp-evento"]');

radiosCorpEvento.forEach(function(radio) {
    radio.addEventListener('change', function() {
        if (corpRadioOutro.checked) {
            corpInputOutro.disabled = false;
            corpInputOutro.focus();
        } else {
            corpInputOutro.disabled = true;
            corpInputOutro.value = '';
            limparErro('corp-input-outro');
        }
    });
});

// ─── Painéis "Um dia" / "Mais de um dia" ───
const btnUmDia   = document.getElementById('pills-um-tab');
const btnMaisDia = document.getElementById('pills-mais-tab');
const painelUm   = document.getElementById('pills-home');
const painelMais = document.getElementById('pills-profile');

btnUmDia.addEventListener('click', function() {
    painelMais.style.display = 'none';
    painelUm.style.display   = '';
    btnUmDia.classList.add('active');
    btnMaisDia.classList.remove('active');
});

btnMaisDia.addEventListener('click', function() {
    painelUm.style.display   = 'none';
    painelMais.style.display = '';
    btnMaisDia.classList.add('active');
    btnUmDia.classList.remove('active');
});

// ─── Helpers ───
function abaSocialAtiva() {
    return document.getElementById('home-tab-pane').classList.contains('active');
}

function radioMarcado(name) {
    return document.querySelector('input[name="' + name + '"]:checked') !== null;
}

function campoPreenchido(id) {
    var el = document.getElementById(id);
    return el && el.value.trim() !== '' && el.value !== '';
}

function destacarErro(id) {
    var el = document.getElementById(id);
    if (el) {
        el.style.outline = '2px solid red';
        el.style.borderRadius = '4px';
    }
}

function limparErro(id) {
    var el = document.getElementById(id);
    if (el) el.style.outline = '';
}

function destacarErroRadio(name) {
    document.querySelectorAll('input[name="' + name + '"]').forEach(function(r) {
        r.style.outline = '2px solid red';
    });
}

function limparErroRadio(name) {
    document.querySelectorAll('input[name="' + name + '"]').forEach(function(r) {
        r.style.outline = '';
    });
}

// ─── Validação completa ───
function validarFormulario() {
    var valido = true;
    var social = abaSocialAtiva();

    // Duração: um dia ou mais de um dia
    var umDiaVisivel = painelMais.style.display === 'none';
    if (umDiaVisivel) {
        if (!campoPreenchido('umDia-data'))        { destacarErro('umDia-data');        valido = false; } else { limparErro('umDia-data'); }
        if (!campoPreenchido('umDia-horaInicio'))  { destacarErro('umDia-horaInicio');  valido = false; } else { limparErro('umDia-horaInicio'); }
        if (!campoPreenchido('umDia-horaTermino')) { destacarErro('umDia-horaTermino'); valido = false; } else { limparErro('umDia-horaTermino'); }
    } else {
        if (!campoPreenchido('maisDias-dataInicio'))  { destacarErro('maisDias-dataInicio');  valido = false; } else { limparErro('maisDias-dataInicio'); }
        if (!campoPreenchido('maisDias-dataTermino')) { destacarErro('maisDias-dataTermino'); valido = false; } else { limparErro('maisDias-dataTermino'); }
        if (!campoPreenchido('maisDias-horaInicio'))  { destacarErro('maisDias-horaInicio');  valido = false; } else { limparErro('maisDias-horaInicio'); }
        if (!campoPreenchido('maisDias-horaTermino')) { destacarErro('maisDias-horaTermino'); valido = false; } else { limparErro('maisDias-horaTermino'); }
    }

    // Endereço e convidados
    if (!campoPreenchido('endereco'))       { destacarErro('endereco');       valido = false; } else { limparErro('endereco'); }
    if (!campoPreenchido('num-convidados')) { destacarErro('num-convidados'); valido = false; } else { limparErro('num-convidados'); }

    // Dados pessoais
    if (!campoPreenchido('nome'))     { destacarErro('nome');     valido = false; } else { limparErro('nome'); }
    if (!campoPreenchido('email'))    { destacarErro('email');    valido = false; } else { limparErro('email'); }
    if (!campoPreenchido('telefone')) { destacarErro('telefone'); valido = false; } else { limparErro('telefone'); }

    if (social) {
        // Aba Social
        if (!radioMarcado('social-evento')) { destacarErroRadio('social-evento'); valido = false; } else { limparErroRadio('social-evento'); }
        if (!radioMarcado('social-alcool')) { destacarErroRadio('social-alcool'); valido = false; } else { limparErroRadio('social-alcool'); }
        if (radioOutro.checked && !campoPreenchido('input-outro')) {
            destacarErro('input-outro'); valido = false;
        } else {
            limparErro('input-outro');
        }
    } else {
        // Aba Corporativo
        if (!radioMarcado('corp-evento')) { destacarErroRadio('corp-evento'); valido = false; } else { limparErroRadio('corp-evento'); }
        if (!radioMarcado('corp-copos'))  { destacarErroRadio('corp-copos');  valido = false; } else { limparErroRadio('corp-copos'); }

        // Doses: select ou campo "mais de 1000"
        var dosesSelect = document.getElementById('corp-doses');
        var dosesMais   = document.getElementById('corp-doses-mais');
        var dosesOk = (dosesSelect && dosesSelect.value !== '') || (dosesMais && dosesMais.value.trim() !== '');
        if (!dosesOk) {
            if (dosesSelect) dosesSelect.style.outline = '2px solid red';
            valido = false;
        } else {
            if (dosesSelect) dosesSelect.style.outline = '';
        }

        // Bebidas: ao menos uma marcada
        var bebidasMarcadas = document.querySelector('input[name="bebidas"]:checked') !== null;
        if (!bebidasMarcadas) {
            document.querySelectorAll('input[name="bebidas"]').forEach(function(b) { b.style.outline = '2px solid red'; });
            valido = false;
        } else {
            document.querySelectorAll('input[name="bebidas"]').forEach(function(b) { b.style.outline = ''; });
        }

        // "Outro" corporativo
        if (corpRadioOutro.checked && !campoPreenchido('corp-input-outro')) {
            destacarErro('corp-input-outro'); valido = false;
        } else {
            limparErro('corp-input-outro');
        }
    }

    return valido;
}

// ─── Botão Enviar ───
document.getElementById('enviar').addEventListener('click', function(e) {
    e.preventDefault();
    if (validarFormulario()) {
        var modal = new bootstrap.Modal(document.getElementById('modal-msg'));
        modal.show();
    }
});

// ─── Botão Cancelar ───
document.getElementById('cancelar').addEventListener('click', function(e) {
    e.preventDefault();

    // Limpa todos os inputs, selects e textareas do formulário
    document.querySelectorAll('#form-orcamento input, #form-orcamento select, #form-orcamento textarea, #conheceu select, #form-dados input, #form-dados textarea').forEach(function(el) {
        if (el.type === 'checkbox' || el.type === 'radio') {
            el.checked = false;
        } else {
            el.value = '';
        }
        el.style.outline = '';
    });

    // Desabilita e limpa inputs "Outro"
    inputOutro.disabled = true;
    inputOutro.value = '';
    corpInputOutro.disabled = true;
    corpInputOutro.value = '';

    // Restaura painel de duração para "Um dia" (radio checked + painel visível)
    document.getElementById('pills-um-tab').checked  = true;
    document.getElementById('pills-mais-tab').checked = false;
    painelMais.style.display = 'none';
    painelUm.style.display   = '';

    // Volta para aba Social
    var socialTab = new bootstrap.Tab(document.getElementById('social-tab'));
    socialTab.show();
});