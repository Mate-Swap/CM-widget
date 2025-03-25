"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { ArrowRight, ChevronDown, Info, Moon, Sun, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useTheme } from "next-themes"

// Define supported assets with custom icons
const SUPPORTED_ASSETS = [
  {
    id: "USDC",
    name: "USD Coin",
    symbol: "USDC",
    icon: "https://cdn-icons-png.flaticon.com/512/14446/14446285.png",
  },
  {
    id: "WBTC",
    name: "Wrapped Bitcoin",
    symbol: "WBTC",
    icon: "https://s2.coinmarketcap.com/static/img/coins/200x200/3717.png",
  },
  {
    id: "USDT",
    name: "Tether",
    symbol: "USDT",
    icon: "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Tether-USDT-icon.png",
  },
]

// Only Polygon network
const POLYGON_NETWORK = {
  id: "POLY",
  name: "Polygon",
  icon: "https://cdn3d.iconscout.com/3d/premium/thumb/polygon-3d-icon-download-in-png-blend-fbx-gltf-file-formats--bitcoin-logo-cryptocurrency-crypto-coin-coins-pack-science-technology-icons-8000675.png?f=webp",
}

// Fixed destination address
const FIXED_DESTINATION = "0xdC7166Ff2c106014f5E4D96ae4b6802c767a79c7"

export default function TopperWidget() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState(SUPPORTED_ASSETS[0])
  const [amount, setAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [addressCopied, setAddressCopied] = useState(false)
  const { theme, setTheme } = useTheme()

  // Load Topper SDK
  useEffect(() => {
    const loadTopperSDK = async () => {
    try {
        // Importa el SDK dinámicamente para evitar problemas con SSR
        const Topper = await import('@uphold/topper-web-sdk').then(module => module.default);
        
        // Inicializa el SDK con tu API key
        const topperInstance = await Topper.create({
          clientId: '4ea2425b-09f6-445f-ab69-c560d6afb166', // Tu API Key
          environment: 'production', // o 'sandbox' para pruebas
          supportedAssets: ['USDC', 'WBTC', 'USDT'], // Restringe los activos
          supportedNetworks: ['POLY'], // Restringe las redes
        });
        
        // Guarda la instancia en una variable global o en un contexto de React
        window.topperInstance = topperInstance;
        setIsSDKLoaded(true);
      } catch (error) {
        console.error("Error al cargar el SDK de Topper:", error);
      }
        setTimeout(() => {
          setIsSDKLoaded(true)
        }, 1000)
      } catch (error) {
        console.error("Error al cargar el SDK de Topper:", error)
      }
    }

    loadTopperSDK()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!amount) return

    setIsProcessing(true)

    try {
      // In a real implementation, you would call the SDK methods here
      // For example:
      // await topper.createTransaction({
      //   asset: selectedAsset.id,
      //   network: POLYGON_NETWORK.id,
      //   amount: amount,
      //   destination: FIXED_DESTINATION
      // })

      // Simulate processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Reset form
      setAmount("")

      // Show success message or redirect
      alert(`¡Transacción de ${amount} ${selectedAsset.symbol} en la red ${POLYGON_NETWORK.name} iniciada!`)
    } catch (error) {
      console.error("La transacción falló:", error)
      alert("La transacción falló. Por favor, inténtelo de nuevo.")
    } finally {
      setIsProcessing(false)
    }
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(FIXED_DESTINATION)
    setAddressCopied(true)
    setTimeout(() => setAddressCopied(false), 2000)
  }

  return (
    <div className="w-full px-4 sm:px-6 md:px-0 max-w-md mx-auto">
      <Card className="w-full overflow-hidden border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white dark:from-blue-800 dark:to-indigo-900 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <CardTitle className="text-lg sm:text-xl font-bold">CryptoMate</CardTitle>
              <CardDescription className="text-blue-100 mt-1 text-sm sm:text-base">
                Acceda a múltiples canales para carga de saldo
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full text-white hover:text-white hover:bg-white/20 h-8 w-8 sm:h-10 sm:w-10"
              >
                <Sun className="h-4 w-4 sm:h-5 sm:w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 sm:h-5 sm:w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Cambiar tema</span>
              </Button>
              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full overflow-hidden">
                <img
                  src="https://img.freepik.com/vector-premium/plantilla-diseno-logotipo-te-matcha-cuenco-logotipo-hojas-te-logo-plano-te-matcha-lujo_462371-1216.jpg"
                  alt="Logo de CryptoMate"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="asset" className="text-sm sm:text-base">
                Activo
              </Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between font-normal text-sm sm:text-base h-10 sm:h-11"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={selectedAsset.icon || "/placeholder.svg"}
                        alt={selectedAsset.name}
                        className="h-5 w-5 sm:h-6 sm:w-6"
                      />
                      <span>{selectedAsset.name}</span>
                      <span className="text-muted-foreground">({selectedAsset.symbol})</span>
                    </div>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[calc(100vw-2rem)] sm:w-full max-w-md" align="start">
                  {SUPPORTED_ASSETS.map((asset) => (
                    <DropdownMenuItem
                      key={asset.id}
                      onClick={() => setSelectedAsset(asset)}
                      className="flex items-center gap-2"
                    >
                      <img src={asset.icon || "/placeholder.svg"} alt={asset.name} className="h-5 w-5 sm:h-6 sm:w-6" />
                      <span>{asset.name}</span>
                      <span className="text-muted-foreground">({asset.symbol})</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-2">
              <Label htmlFor="network" className="text-sm sm:text-base">
                Red
              </Label>
              <div className="flex items-center gap-2 p-2 sm:p-3 border rounded-md">
                <img
                  src={POLYGON_NETWORK.icon || "/placeholder.svg"}
                  alt={POLYGON_NETWORK.name}
                  className="h-5 w-5 sm:h-6 sm:w-6"
                />
                <span className="text-sm sm:text-base">{POLYGON_NETWORK.name}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="amount" className="text-sm sm:text-base">
                  Cantidad
                </Label>
                <span className="text-xs sm:text-sm text-muted-foreground">
                  Disponible: 0.00 {selectedAsset.symbol}
                </span>
              </div>
              <div className="relative">
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pr-16 h-10 sm:h-11 text-sm sm:text-base"
                  step="any"
                  min="0"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-xs sm:text-sm text-muted-foreground">{selectedAsset.symbol}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="recipient" className="text-sm sm:text-base">
                  Dirección de Destino
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs sm:text-sm">Dirección fija para la red {POLYGON_NETWORK.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center p-2 sm:p-3 bg-muted rounded-md">
                <code className="text-xs sm:text-sm truncate flex-1 break-all">{FIXED_DESTINATION}</code>
                <Button variant="ghost" size="sm" onClick={copyToClipboard} className="h-7 w-7 sm:h-8 sm:w-8 p-0 ml-1">
                  <span className="sr-only">Copiar dirección</span>
                  <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
              {addressCopied && (
                <p className="text-xs text-green-600 dark:text-green-400 text-right">¡Dirección copiada!</p>
              )}
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-700 dark:to-indigo-800 dark:hover:from-blue-800 dark:hover:to-indigo-900 h-10 sm:h-11 text-sm sm:text-base"
                disabled={!isSDKLoaded || isProcessing}
              >
                {isProcessing ? "Procesando..." : "Cargar"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="bg-muted/50 px-4 py-3 sm:px-6 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
          <div className="flex items-center gap-1">
            <span>Desarrollado por</span>
            <span className="font-semibold">CryptoMate</span>
          </div>
          <a href="#" className="flex items-center gap-1 hover:text-foreground transition-colors">
            <span>Ver historial de transacciones</span>
            <ArrowRight className="h-3 w-3" />
          </a>
        </CardFooter>
      </Card>
    </div>
  )
}

