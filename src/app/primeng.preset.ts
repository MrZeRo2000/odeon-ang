import { definePreset } from '@primeng/themes';
import Material from '@primeng/themes/material';

export const OdeonPreset = definePreset(Material, {
  //Your customizations, see the following sections for examples
  semantic: {
    primary: {
      50: '{sky.50}',
      100: '{sky.100}',
      200: '{sky.200}',
      300: '{sky.300}',
      400: '{sky.400}',
      500: '{sky.500}',
      600: '{sky.600}',
      700: '{sky.700}',
      800: '{sky.800}',
      900: '{sky.900}',
      950: '{sky.950}'
    },
    colorScheme: {
      light: {
        text: {
          color: "{surface.700}",
          hoverColor: "{surface.800}",
          mutedColor: "{surface.500}",
          hoverMutedColor: "{surface.600}"
        },
        content: {
          borderColor: "{surface.200}"
        }
      },
      dark: {
        text: {
          color: "{surface.0}",
          hoverColor: "{surface.0}",
          mutedColor: "{surface.400}",
          hoverMutedColor: "{surface.300}"
        },
        content: {
          borderColor: "{surface.700}"
        }
      }
    }
  },
  components: {
    menubar: {
      colorScheme: {
        light: {
          root: {
            background: "{surface.50}"
          }
        },
        dark: {
          root: {
            background: "{surface.800}"
          }
        }
      }
    },
    datatable: {
      colorScheme: {
        light: {
          header: {
            background: "{surface.50}",
            borderWidth: "1px 0px 1px 0px",
          },
          headerCell: {
            background: "{surface.50}",
            hoverBackground: "{surface.100}",
          },
          footer: {
            background: "{surface.50}",
          },
          footerCell: {
            background: "{surface.50}",
          },
        },
        dark: {
          root: {
            borderColor: "{surface.800}"
          },
          header: {
            background: "{surface.800}",
          },
          headerCell: {
            background: "{surface.800}",
            hoverBackground: "{surface.700}",
          },
          footer: {
            background: "{surface.800}",
          },
          footerCell: {
            background: "{surface.800}",
          }
        }
      }
    }
  }
});


