export interface RouteChild {
  name: string;
  path: string;
  adminOnly?: boolean;
  modOnly?: boolean;
}

export interface Route {
  name: string;
  path: string;
  adminOnly?: boolean;
  children: Record<string, RouteChild>;
}
  
export const routes: Record<string, Route> = {
  user: {
      name: "Gerenciamento de Usuário",
      path: "user/",
      adminOnly: true, // Apenas admins podem gerenciar usuários
      children: {
          create_user: { name: "Criar Usuário", path: "create_user/", adminOnly: true },
          delete_user: { name: "Deletar Usuário", path: "delete_user/", adminOnly: true },
          list_users: { name: "Listar Usuários", path: "list_users/", adminOnly: true },
          mod_pass: { name: "Modificar Senha", path: "mod_pass/" }
      }
  },
  stock: {
      name: "Gerenciamento de Estoque",
      path: "stock/",
      children: {
          create_product: { name: "Criar Produto", path: "create_product/" },
          delete_product: { name: "Deletar Produto", path: "delete_product/" },
          list_product: { name: "Listar Produtos", path: "list_product/" },
          update_product: { name: "Atualizar Produto", path: "update_product/" }
      }
  },
  sales: {
      name: "Gerenciamento de Vendas",
      path: "sales/",
      children: {
          make_sale: { name: "Registrar Venda", path: "makeSale/" },
          make_refund: { name: "Registrar Reembolso", path: "makeRefund/", modOnly: true },
          get_sales: { name: "Obter Vendas", path: "getSales/" }
      }
  },
  data: {
      name: "Análise de data",
      path: "data/",
      children: {
          data_sale: { name: "Gráfico de Vendas", path: "dataSale/" },
          get_data: { name: "Vendas Diárias", path: "getData/" }
      }
  }
};

export function filterRoutesByRole(authService: any): Record<string, Route> {
  const userRole = authService.getUser();
  
  return Object.fromEntries(
      Object.entries(routes)
          .filter(([_, route]) => !route.adminOnly || userRole === 'admin')
          .map(([key, route]) => [
              key,
              {
                  ...route,
                  children: Object.fromEntries(
                      Object.entries(route.children).filter(([_, child]) =>
                          (!child.adminOnly || userRole === 'admin') &&
                          (!child.modOnly || userRole === 'mod' || userRole === 'admin')
                      )
                  )
              }
          ])
  );
}
