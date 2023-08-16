export const validacoes = {
    verificarFormaDePagamento(formaDePagamento) {
        const pagamentos = ["dinheiro", "debito", "credito"];
        return pagamentos.includes(formaDePagamento);
    },

    verificarItemValido(item, cardapio) {
        return !!cardapio[item];
    },

    verificarQuantidadeValida(qt) {
        return parseInt(qt) > 0;
    },

    verificarItemExtra(item, itens) {
        return item.includes("extra") && !itens.includes(item.replace("extra", ""));
    },

    verificarExtraSemPrincipal(itensPrincipais, itemPrincipal, itemExtra) {
        return !itensPrincipais.has(itemPrincipal) && itensPrincipais.has(itemExtra);
    }
};
