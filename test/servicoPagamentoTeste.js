import assert from 'assert';
import { servicoPagamento } from '../src/servicoPagamento.js';

describe('Suíte: Serviço de Pagamento', () => {
    let servico;

    beforeEach(() => {
        servico = new servicoPagamento();
    });

    it('Preenche a categoria como "cara" quando o valor for maior que 100.00', () => {
        servico.pagar('0987-7656-3475', 'Samar', 156.87);
        
        const ultimoPagamento = servico.consultarUltimoPagamento();
        
        assert.strictEqual(ultimoPagamento.codigoBarras, '0987-7656-3475');
        assert.strictEqual(ultimoPagamento.empresa, 'Samar');
        assert.strictEqual(ultimoPagamento.valor, 156.87);
        assert.strictEqual(ultimoPagamento.categoria, 'cara');
    });

    it('Preenche a categoria como "padrão" quando o valor for menor ou igual a 100.00', () => {
        servico.pagar('1111-2222-3333', 'Celesc', 50.00);
        
        const ultimoPagamento = servico.consultarUltimoPagamento();
        
        assert.strictEqual(ultimoPagamento.categoria, 'padrão');
    });

    it('Traz apenas o último item da lista', () => {
        servico.pagar('1111', 'Padaria', 10.00);
        servico.pagar('2222', 'Conveniência', 20.00);
        
        const ultimoPagamento = servico.consultarUltimoPagamento();
        
        assert.strictEqual(ultimoPagamento.empresa, 'Conveniência');
    });
});