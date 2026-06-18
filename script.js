// Aguarda o carregamento do DOM para rodar as configurações iniciais
document.addEventListener('DOMContentLoaded', () => {
    
    // Configura automaticamente a data atual (Hoje) no formulário
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('data_manutencao').value = today;

    // Monitora o envio do formulário
    const form = document.getElementById('maintenance-form');
    form.addEventListener('submit', generateReport);
});

function generateReport(event) {
    // Cancela o comportamento padrão de atualizar a página ao enviar form
    event.preventDefault();

    // Função interna para converter datas de (AAAA-MM-DD) para (DD/MM/AAAA)
    const formatarDataBr = (dateStr) => {
        if (!dateStr) return '';
        const [year, month, day] = dateStr.split('-');
        return `${day}/${month}/${year}`;
    };

    // Coleta dos campos e injeção no template oculto de impressão
    document.getElementById('p-maquina').innerText = document.getElementById('maquina').value;
    document.getElementById('p-patrimonio').innerText = document.getElementById('patrimonio').value;
    document.getElementById('p-unidade').innerText = document.getElementById('unidade').value;
    document.getElementById('p-local').innerText = document.getElementById('local').value;
    
    // Captura o Radio Button ativo
    const tipoSelecionado = document.querySelector('input[name="tipo_manutencao"]:checked').value;
    document.getElementById('p-tipo').innerText = tipoSelecionado;
    
    // Conversão das datas para o formato BR
    document.getElementById('p-data').innerText = formatarDataBr(document.getElementById('data_manutencao').value);
    document.getElementById('p-proxima').innerText = formatarDataBr(document.getElementById('proxima_manutencao').value);
    
    // Coleta dos demais dados textuais
    const nomeExecutor = document.getElementById('executor').value;
    document.getElementById('p-executor').innerText = nomeExecutor;
    document.getElementById('p-chamado').innerText = document.getElementById('chamado').value || 'N/A';
    document.getElementById('p-procedimentos').innerText = document.getElementById('procedimentos').value;
    
    // Atualiza o nome do técnico na linha de assinatura do documento
    document.getElementById('p-sign-executor').innerText = nomeExecutor;

    // Executa a chamada de impressão nativa do sistema operacional (abre o PDF ou Impressora)
    window.print();
}