import { cardapio } from './cardapio';
import { validacoes } from './utils.js';

class CaixaDaLanchonete {
    constructor() {
        this.cardapio = cardapio;
    }

    calcularValorDaCompra(formaDePagamento, itens) {
        if (!validacoes.verificarFormaDePagamento(formaDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        this.itensPrincipais = new Set();
        const extrasMap = new Map();

        let total = 0;

        for (const itemInfo of itens) {
            const [item, quantidade] = itemInfo.split(',');

            if (!validacoes.verificarItemValido(item, this.cardapio)) {
                return "Item inválido!";
            }

            if (!validacoes.verificarQuantidadeValida(quantidade)) {
                return "Quantidade inválida!";
            }

            if (validacoes.verificarItemExtra(item, itens)) {
                const itemPrincipal = item.replace("extra", "");
                if (!itens.includes(itemPrincipal)) {
                    return "Item extra não pode ser pedido sem o principal";
                }
                extrasMap.set(itemPrincipal, (extrasMap.get(itemPrincipal) || 0) + parseInt(quantidade));
            } else {
                this.itensPrincipais.add(item);
            }

            total += this.cardapio[item] * parseInt(quantidade);
        }

        for (const [principal, quantidadeExtra] of extrasMap) {
            if (!this.itensPrincipais.has(principal)) {
                return "Item extra não pode ser pedido sem o principal";
            }
        }

        if (validacoes.verificarExtraSemPrincipal(this.itensPrincipais, "cafe", "chantily") ||
        validacoes.verificarExtraSemPrincipal(this.itensPrincipais, "sanduiche", "queijo") ||
            (this.itensPrincipais.size === 0 && formaDePagamento === "dinheiro")) {
            return "Item extra não pode ser pedido sem o principal";
        }

        if (formaDePagamento === "dinheiro") {
            total *= 0.95;
        } else if (formaDePagamento === "credito") {
            total *= 1.03;
        }

        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };
