from tabulate import tabulate

def busca(inicio, objetivo, obstaculos):
    abertos = []
    fechados = []
    tam = 10
    grid = {}

    for i in range(tam):
        for j in range(tam):
            if [i, j] in obstaculos:
                grid[i, j] = {}
                grid[i, j]["f"] = 100
            else:
                grid[i, j] = {}
                grid[i, j]["h"] = heuristica([i, j], objetivo, obstaculos)
                grid[i, j]["f"] = grid[i, j]["h"]
            grid[i, j]["g"] = 100

    grid[inicio[0], inicio[1]]["g"] = 0

    abertos.append(inicio)

    while abertos:
        atual = min(abertos, key=lambda nodo: grid[nodo[0], nodo[1]]["f"])

        if atual == objetivo:
            cam = caminho(atual, grid)
            return exibir(tam, cam, grid, obstaculos)

        abertos.remove(atual)
        fechados.append(atual)

        adjacentes = []
        if atual[0] <= 8:
            adjacentes.append([atual[0] + 1, atual[1]])
        if atual[0] >= 1:
            adjacentes.append([atual[0] - 1, atual[1]])
        if atual[1] <= 8:
            adjacentes.append([atual[0], atual[1] + 1])
        if atual[1] >= 1:
            adjacentes.append([atual[0], atual[1] - 1])

        for adjacente in adjacentes:
            if adjacente in fechados:
                continue

            if adjacente in obstaculos:
                continue

            tentativa_g = grid[atual[0], atual[1]]["g"] + 1

            if tentativa_g < grid[adjacente[0], adjacente[1]]["g"]:
                grid[adjacente[0], adjacente[1]]["origem"] = atual
                grid[adjacente[0], adjacente[1]]["g"] = tentativa_g
                grid[adjacente[0], adjacente[1]]["f"] = tentativa_g + heuristica(adjacente, objetivo, obstaculos)

                if adjacente not in abertos:
                    abertos.append(adjacente)

    return "Caminho nao encontrado", False

def heuristica(cel, objetivo, obstaculos):
    if cel in obstaculos:
        return 100
    return abs(cel[0] - objetivo[0]) + abs(cel[1] - objetivo[1])

def caminho(atual, grid):
    caminho = [atual]
    while "origem" in grid[atual[0], atual[1]]:
        atual = grid[atual[0], atual[1]]["origem"]
        caminho.insert(0, atual)
    return caminho

def exibir(tam, cam, grid, obstaculos):
    verde = "\033[32m"
    vermelho = "\033[31m"
    amarelo = "\033[33m"
    azul = "\033[34m"

    custo = 0
    for i in cam:
        custo += grid[i[0], i[1]]["f"]

    dados_grid = []
    for i in range(tam):
        linha_dados = []
        for j in range(tam):
            if [i, j] == cam[0]:
                celula_texto = f"{verde}{grid[i, j]['f']}\033[0m"
            elif [i, j] == cam[-1]:
                celula_texto = f"{azul}{grid[i, j]['f']}\033[0m"
            elif [i, j] in cam:
                celula_texto = f"{amarelo}{grid[i, j]['f']}\033[0m"
            else:
                if [i, j] not in obstaculos:
                  celula_texto = grid[i, j]['f']
                else:
                  celula_texto = f"{vermelho}#\033[0m"
            linha_dados.append(celula_texto)
        dados_grid.append(linha_dados)

    return tabulate(dados_grid, tablefmt="grid"), custo

obstaculos = [[9, 1], [8, 1], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [3, 7], [2, 7]]
x_inicio = 9
y_inicio = 2
x_final = 3
y_final = 0

input_obstaculos = []
obstaculo = 1
while obstaculo:
  obstaculo = input("Coordenada obstaculo (enter para pular):\n")
  if obstaculo:
    input_obstaculos.append(list(map(int, obstaculo.split())))
if input_obstaculos:
  obstaculos = input_obstaculos

aceito = False
while not aceito:
  aceito = True
  input_inicio = input("Coordenada inicial (enter para pular):\n")
  if input_inicio:
    x, y = map(int, input_inicio.split())
    if [x, y] in obstaculos:
      aceito = False
      print("Sua coordenada nao pode ocupar a mesma culula que um obstaculo.\n")
    else:
      x_inicio = x
      y_inicio = y

aceito = False
while not aceito:
  aceito = True
  input_final = input("Coordenada final (enter para pular):\n")
  if input_final:
    x, y = map(int, input_final.split())
    if [x, y] in obstaculos:
      aceito = False
      print("Sua coordenada nao pode ocupar a mesma culula que um obstaculo.\n")
    else:
      x_final = x
      y_final = y

tabuleiro, custo = busca([x_inicio, y_inicio], [x_final, y_final], obstaculos)
print(tabuleiro)
if custo:
  print(f"Custo: {custo}")