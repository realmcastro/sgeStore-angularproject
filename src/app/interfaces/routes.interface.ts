export interface RouteChild {
    name: string;
    path: string;
  }
  
  export interface Route {
    name: string;
    path: string;
    children: Record<string, RouteChild>;
  }
    
  export const routes: Record<string, Route> = {
    user: {
      name: "User Management",
      path: "user/",
      children: {
        create_user: { name: "Criar Usuário", path: "create_user/" },
        login: { name: "Login", path: "login/" },
        mod_pass: { name: "Modificar Senha", path: "mod_pass/" },
        delete_user: { name: "Deletar Usuário", path: "delete_user/" },
        list_users: { name: "Listar Usuários", path: "list_users/" }
      }
    },
    stock: {
      name: "Stock Management",
      path: "stock/",
      children: {
        create_product: { name: "Criar Produto", path: "create_product/" },
        delete_product: { name: "Deletar Produto", path: "delete_product/" },
        list_product: { name: "Listar Produtos", path: "list_product/" },
        update_product: { name: "Atualizar Produto", path: "update_product/" }
      }
    },
    sales: {
      name: "Sales Management",
      path: "sales/",
      children: {
        make_sale: { name: "Registrar Venda", path: "makeSale/" },
        make_refund: { name: "Registrar Reembolso", path: "makeRefund/" },
        get_sales: { name: "Obter Vendas", path: "getSales/" }
      }
    },
    data: {
      name: "Data Analysis",
      path: "data/",
      children: {
        data_sale: { name: "Gráfico de Vendas", path: "dataSale/" },
        get_data: { name: "Vendas Diárias", path: "getData/" }
      }
    }
  };