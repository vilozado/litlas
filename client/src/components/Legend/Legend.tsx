import { useEffect } from "react";
import { useMap } from "react-leaflet";
import * as L from "leaflet";

export default function Legend() {
  const map = useMap();

  useEffect(() => {
    const LegendControl = L.Control.extend({
      onAdd() {
        const div = L.DomUtil.create("div", "map-legend");
        div.innerHTML = `
          <h4>Legend</h4>
          <div class="legend-item">
            <span class="legend-swatch" style="background:#fdf3d8"></span>
            Available
          </div>
          <div class="legend-item">
            <span class="legend-swatch" style="background:#e7c25a"></span>
            Saved to read
          </div>
          <div class="legend-item">
            <span class="legend-swatch" style="background:#243447"></span>
            Read
          </div>
          <div class="legend-item">
            <span class="legend-swatch" style="background:#fbf9f6"></span>
            Not available
          </div>
        `;
        return div;
      },
    });

    const legend = new LegendControl({ position: "bottomright" });
    legend.addTo(map);

    return () => {
      legend.remove();
    };
  }, [map]);

  return null;
}
